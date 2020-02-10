# VPC configuration (Example)

## 1. Create NAT subnet

IPv4 CIDR block: `172.31.254.0/24`

Feel free to pick another IP range and prefix that applies to your VPC and
expected scale. To ease identification, add optional name tag: `lambda-nat-subnet`

## 2. Create NAT Gateway

Subnet: one of your public subnets, preferably in the same availability zone
as your NAT subnet

Elastic IP Allocation ID: Create new EIP

Followed by "Edit Route Tables"

## 3. Create route table

To ease identification, add optional name tag: `lambda-nat-routes`

Then add route to the new route table `0.0.0.0/0 nat-xxxx`
(nat-xxxx is your new NAT Gateway ID created in `step 2`).

## 4. Apply new route table to NAT subnet created in `step 1`

## 5. Create Security Group

Name tag: `lambda-nat-sg`

Group name: `lambda-nat-sg` (auto filled)

Description: `lambda-nat-sg`

VPC: Your VPC

The Security Group should have a default all access outbound rule `(0.0.0.0/0)`.
Now add an inbound rule that allows All Traffic from within the same
Security Group (`sg-xxxx`, pointing to the SG ID of its own).

## 6. Configure Lambda function to access Internet via NAT

VPC: Your VPC

Subnet: NAT enabled subnet created in `step 1`

Security Group: Security Group created in `step 5`
