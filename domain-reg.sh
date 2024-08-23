#!/bin/bash
curl -sL -X POST \
    -H 'Content-Type: application/json' \
    https://icp0.io/registrations \
    --data @- <<EOF
{
    "name": "insaneclownprotocol.com"
}
EOF