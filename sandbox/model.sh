#!/bin/bash
HACKERRANK_REPO=~/Dev/hackerrank/hackerrank-code
BCRUMB1=Algorithms
BCRUMB2=Warmup
if [ -d $HACKERRANK_REPO ]; then
  echo $HACKERRANK_REPO exists;
fi
if [ -d $HACKERRANK_REPO/$BCRUMB1 ]; then
  echo $HACKERRANK_REPO/$BCRUMB1 exists;
fi
if [ -d $HACKERRANK_REPO/$BCRUMB1/$BCRUMB2 ]; then
  echo $HACKERRANK_REPO/$BCRUMB1/$BCRUMB2 exists;
fi
