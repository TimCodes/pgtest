import sys
import pandas as pd
import os
import re 


def removeNonValidNums(leadsFilePath):   
    
     validLeadsPath = '../temprocessingdata/validleads.csv'
     numReg     =  re.compile('/^\d{10}$/') 

     if os.path.isfile(validLeadsPath): 
        os.remove(validLeadsPath)

     for chunk in pd.read_csv(leadsFilePath, chunksize=500000, names= ['phone'], dtype = str):
        #print chunk['phone'].str.len()
        validChunk = chunk[chunk['phone'].str.len() == 10]
        validChunk.to_csv(validLeadsPath,  mode='a', header = False, index = False)

     return validLeadsPath    
        


def main(): 
  
    strippedFileName  = str(sys.argv[1])
    phoneColName      = str(sys.argv[2])
    orginalLeadsCount = len(pd.read_csv(leadsfileName)) + 1
    
    validleadspath     = removeNonValidNums(strippedFileName)

    afterFormatCount   = len(pd.read_csv(validleadspath)) + 1
    #returnStatDict     =   "removed" + "-" +  orginalLeadsCount - afterFormatCount 
                         

    print "removed-" + str(orginalLeadsCount - afterFormatCount) + ",orignalcount-" + str(orginalLeadsCount) + ",aftercount-" + str(afterFormatCount)


if __name__ == '__main__':
    main()