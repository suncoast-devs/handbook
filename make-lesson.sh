#!/bin/sh

# Abort on errors`
set -e

UNIT="$1"
LESSON_NAME="$2"

# Prompt if missing
if [ -z "${UNIT}" ]; then
  /bin/echo -n "Enter the name of the unit: "
  read UNIT
fi

if [ ! -d ./curriculum/${UNIT} ]; then
  echo "This unit does not exist"
  exit 1
fi

# Prompt if missing
if [ -z "${LESSON_NAME}" ]; then
  /bin/echo -n "Enter the name of the lesson: "
  read LESSON_NAME
fi

# Slugify
LESSON_NAME=$(echo $LESSON_NAME | sed -e 's/[^[:alnum:]]/-/g' | tr -s '-' | tr A-Z a-z)

mkdir -p curriculum/${UNIT}/lessons/${LESSON_NAME}
cp -n -a .lesson-template/* curriculum/${UNIT}/lessons/${LESSON_NAME}
