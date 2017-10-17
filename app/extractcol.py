import sys
import pandas as pd
import os
import re 


def extractcol(leadsFilePath, numColName):
    
      extractedLeadsPath = '../temprocessingdata/extractedleads.csv'

      if os.path.isfile(extractedLeadsPath): 
        os.remove(extractedLeadsPath)

      for chunk in pd.read_csv(leadsFilePath, chunksize=100000, dtype = str):
            num    = chunk[numColName]
            num.to_csv(extractedLeadsPath,  mode='a', header = False, index = False)

      return extractedLeadsPath   



def main(): 
  
    fileName  = str(sys.argv[1])
    colName   = str(sys.argv[2])
    
    colfilepath = extractcol(fileName, colName)

    


if __name__ == '__main__':
    main()