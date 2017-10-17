import sys
import pandas as pd
import os
import re 


def remove_non_numeric(inputfileName, phoneColName, outfilename):
    
    strippedLeadsPath = outfilename
    remove_non_numbers = re.compile(r'[^\d]+')
    
    if os.path.isfile(strippedLeadsPath): 
        os.remove(strippedLeadsPath)

    for chunk in pd.read_csv(inputfileName, chunksize=10000, dtype = str, names= ['phone']):
       chunk[phoneColName] = chunk[phoneColName].str.replace(r'[^\d]+', '')
       chunk[phoneColName] = chunk[phoneColName].str.replace(' ', '')
       validChunk          = chunk[chunk[phoneColName].str.len() == 10]
       validChunk .to_csv(strippedLeadsPath,  mode='a', columns = [phoneColName], header = False, index = False)

    return strippedLeadsPath   



def main(): 
  
    inputFileName     = str(sys.argv[1])
    phoneColName      = str(sys.argv[2])
    outfilename       = str(sys.argv[3])
    
    remove_non_numeric(inputFileName, phoneColName, outfilename)

if __name__ == '__main__':
    main()