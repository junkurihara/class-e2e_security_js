#!/bin/bash

InFile=$1
OutFile=${InFile%.*}-pdfa.pdf

gs -dPDFA -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile=${OutFile} ${InFile}
