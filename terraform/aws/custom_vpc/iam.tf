resource "aws_iam_role" "acebox_role" {
  name = "acebox_role-${random_id.uuid.hex}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    App = "ace-box"
  }
}

resource "aws_iam_instance_profile" "acebox_profile" {
  name = "acebox_profile-${random_id.uuid.hex}"
  role = aws_iam_role.acebox_role.name
}

resource "aws_iam_role_policy" "acebox_s3_policy" {
  name = "acebox_s3_policy-${random_id.uuid.hex}"
  role = aws_iam_role.acebox_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:*"]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}