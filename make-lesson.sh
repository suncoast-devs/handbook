#!/bin/sh

# Abort on errors`
set -e

UNIT="$1"
MODULE="$2"
LESSON_NAME="$3"

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
if [ -z "${MODULE}" ]; then
  /bin/echo -n "Enter the name of the module: "
  read MODULE_NAME
fi

# Prompt if missing
if [ -z "${LESSON_NAME}" ]; then
  /bin/echo -n "Enter the name of the lesson: "
  read LESSON_NAME
fi

# Slugify
MODULE_NAME=$(echo $MODULE_NAME | sed -e 's/[^[:alnum:]]/-/g' | tr -s '-' | tr A-Z a-z)
LESSON_NAME=$(echo $LESSON_NAME | sed -e 's/[^[:alnum:]]/-/g' | tr -s '-' | tr A-Z a-z)

mkdir -p curriculum/${UNIT}/modules/${MODULE_NAME}/lessons/${LESSON_NAME}
cp -n -a .lesson-template/* curriculum/${UNIT}/modules/${MODULE_NAME}/lessons/${LESSON_NAME}
