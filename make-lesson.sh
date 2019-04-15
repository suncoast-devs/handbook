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

# cd curriculum/${UNIT}/lessons/${LESSON_NAME}
# 
# echo "# Introduction goes here" > index.md
# echo "# List of Learning Objectives goes here" > objectives.md
# mkdir -p reading/
# echo "# This should introduce the flipped-classroom-style-reading\n# Suggest making many linked pages to walk students through the subject" > reading/index.md
# mkdir -p lecture/
# echo "# This folder includes resources for an instructor to use during a lecture on this lesson" > lecture/index.md
# mkdir -p lecture/code/
# echo "# This directory should contain a series of directories, nubmered 01, 02, etc, that are the progressive steps of code to show during lecture" > lecture/code/index.md
# mkdir -p lecture/presentation/
# echo "# This should be a markdown based presentation to show/follow during lecture" > lecture/presentation/index.md
# mkdir -p assignments/
# echo "# This directory should contain markdown of several example assignments that relate to this lesson" > assignments/index.md
# 