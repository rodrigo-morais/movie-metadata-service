provider "aws" {
  region = "us-east-1"
}

variable "omdb_url" {}
variable "api_key" {}
variable "file_source" {}
variable "s3_bucket" {}

resource "aws_iam_role" "lambda_exec_role" {
  name               = "lambda_exec_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ["lambda.amazonaws.com", "apigateway.amazonaws.com", "s3.amazonaws.com"]
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

resource "aws_iam_role_policy" "s3_policy" {
  name = "s3-policy"
  role = aws_iam_role.lambda_exec_role.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket",
              "s3:GetBucketLocation"
          ],
          "Resource": [
              "arn:aws:s3:::${var.s3_bucket}"
          ]
      },
      {
          "Effect": "Allow",
          "Action": [
              "s3:GetObjectMetaData",
              "s3:GetObject",
              "s3:PutObject",
              "s3:ListMultipartUploadParts",
              "s3:AbortMultipartUpload"
          ],
          "Resource": [
              "arn:aws:s3:::${var.s3_bucket}/*"
          ]
      }
  ]
}
EOF
}



resource "aws_lambda_function" "movie" {
  function_name    = "Movie"
  handler          = "movie.handler"
  runtime          = "nodejs10.x"
  filename         = "joyn.zip"
  source_code_hash = filebase64sha256("joyn.zip")
  role             = aws_iam_role.lambda_exec_role.arn
  timeout          = 60

  environment {
    variables = {
      OMDB_URL    = var.omdb_url
      API_KEY     = var.api_key
      FILE_SOURCE = var.file_source
      S3_BUCKET   = var.s3_bucket
    }
  }
}

resource "aws_lambda_function" "movies" {
  function_name    = "Movies"
  handler          = "movies.handler"
  runtime          = "nodejs10.x"
  filename         = "joyn.zip"
  source_code_hash = filebase64sha256("joyn.zip")
  role             = aws_iam_role.lambda_exec_role.arn
  timeout          = 60

  environment {
    variables = {
      OMDB_URL    = var.omdb_url
      API_KEY     = var.api_key
      FILE_SOURCE = var.file_source
      S3_BUCKET   = var.s3_bucket
    }
  }
}

resource "aws_lambda_permission" "apigw_perm_movie" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.movie.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_deployment.deploy_movies.execution_arn}/*/*"
}

resource "aws_lambda_permission" "apigw_perm_movies" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.movies.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_deployment.deploy_movies.execution_arn}/*/*"
}

resource "aws_api_gateway_rest_api" "movies" {
  name        = "Movies"
  description = "Serverless to get list of movies"
}

resource "aws_iam_policy" "allow_invoke_lambda" {
  name        = "invokeLambda_TF"
  description = "Permits Invoking Lambda - deployed by Terraform"
  path        = "/service-role/"
  policy      = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "lambda:InvokeFunction",
      "Resource": "*"
    }
  ]
}
EOF

}

resource "aws_iam_policy_attachment" "attach_lambdaInvoking" {
  name       = "invokingLambdaAttachment_TF"
  roles      = [aws_iam_role.lambda_exec_role.name]
  policy_arn = aws_iam_policy.allow_invoke_lambda.arn
}

resource "aws_api_gateway_resource" "api" {
  rest_api_id = aws_api_gateway_rest_api.movies.id
  parent_id   = aws_api_gateway_rest_api.movies.root_resource_id
  path_part   = "api"
}

resource "aws_api_gateway_resource" "movies" {
  rest_api_id = aws_api_gateway_rest_api.movies.id
  parent_id   = aws_api_gateway_resource.api.id
  path_part   = "movies"
}

resource "aws_api_gateway_resource" "id" {
  rest_api_id = aws_api_gateway_rest_api.movies.id
  parent_id   = aws_api_gateway_resource.movies.id
  path_part   = "{id}"
}

resource "aws_api_gateway_method" "get_movie" {
  rest_api_id   = aws_api_gateway_rest_api.movies.id
  resource_id   = aws_api_gateway_resource.id.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "get_movies" {
  rest_api_id   = aws_api_gateway_rest_api.movies.id
  resource_id   = aws_api_gateway_resource.movies.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_movie" {
  rest_api_id = aws_api_gateway_rest_api.movies.id
  resource_id = aws_api_gateway_method.get_movie.resource_id
  http_method = aws_api_gateway_method.get_movie.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.movie.invoke_arn
  credentials             = aws_iam_role.lambda_exec_role.arn
}

resource "aws_api_gateway_method_response" "movie_response" {
  rest_api_id = aws_api_gateway_rest_api.movies.id
  resource_id = aws_api_gateway_method.get_movie.resource_id
  http_method = aws_api_gateway_method.get_movie.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "lambda_movie" {
  depends_on  = [aws_api_gateway_integration.lambda_movie]
  rest_api_id = aws_api_gateway_rest_api.movies.id
  resource_id = aws_api_gateway_method.get_movie.resource_id
  http_method = aws_api_gateway_method.get_movie.http_method
  status_code = aws_api_gateway_method_response.movie_response.status_code

  response_templates = {
    "application/json" = ""
  }
}

resource "aws_api_gateway_integration" "lambda_movies" {
  rest_api_id = aws_api_gateway_rest_api.movies.id
  resource_id = aws_api_gateway_method.get_movies.resource_id
  http_method = aws_api_gateway_method.get_movies.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.movies.invoke_arn
  credentials             = aws_iam_role.lambda_exec_role.arn
}

resource "aws_api_gateway_method_response" "movies_response" {
  rest_api_id = aws_api_gateway_rest_api.movies.id
  resource_id = aws_api_gateway_method.get_movies.resource_id
  http_method = aws_api_gateway_method.get_movies.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "lambda_movies" {
  depends_on  = [aws_api_gateway_integration.lambda_movies]
  rest_api_id = aws_api_gateway_rest_api.movies.id
  resource_id = aws_api_gateway_method.get_movies.resource_id
  http_method = aws_api_gateway_method.get_movies.http_method
  status_code = aws_api_gateway_method_response.movies_response.status_code

  response_templates = {
    "application/json" = ""
  }
}

resource "aws_api_gateway_deployment" "deploy_movies" {
  depends_on = [
    aws_api_gateway_integration_response.lambda_movies,
    aws_api_gateway_integration.lambda_movies,
  ]

  rest_api_id = aws_api_gateway_rest_api.movies.id
  stage_name  = "prod"
}

output "movies_url" {
  value = aws_api_gateway_deployment.deploy_movies.invoke_url
}
