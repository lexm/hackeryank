#!/bin/bash
HACKERRANK_REPO=~/Dev/hackerrank/hackerrank-code
BCRUMB=Python/Introduction
CODE_FILENAME=python-loops.py

if [ ! -d $HACKERRANK_REPO ]; then
  echo $HACKERRANK_REPO does not exist;
elif [ ! -d $HACKERRANK_REPO/.git ]; then
  echo $HACKERRANK_REPO is not a git repo;
else
  mkdir -p $HACKERRANK_REPO/$BCRUMB
  if [ -d $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME ]; then
    echo $CODE_FILENAME already exists;
  else
    touch $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME
    echo "if __name__ == '__main__':" >> $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME;
    echo "n = int(input())" >> $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME;
    echo "for i in range(0, n):" >> $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME;
    echo "    print(i * i)" >> $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME;
 fi
fi
