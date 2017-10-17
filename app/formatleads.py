import sys
import pandas as pd
import os
import re 

def extractNumsFromLeads(leadsFilePath, numColName):
    
      extractedLeadsPath = '../temprocessingdata/extractedleads.csv'

      if os.path.isfile(extractedLeadsPath): 
        os.remove(extractedLeadsPath)

      for chunk in pd.read_csv(leadsFilePath, chunksize=100000, dtype = str):
            num    = chunk[numColName]
            num.to_csv(extractedLeadsPath,  mode='a', header = False, index = False)

      return extractedLeadsPath   

def remove_non_numeric(inputfileName, phoneColName):
    
    strippedLeadsPath = '../temprocessingdata/stripedleads.csv'
    remove_non_numbers = re.compile(r'[^\d]+')
    
    if os.path.isfile(strippedLeadsPath): 
        os.remove(strippedLeadsPath)

    for chunk in pd.read_csv(inputfileName, chunksize=10000, dtype = str, names= ['phone']):
       chunk[phoneColName] = chunk[phoneColName].str.replace(r'[^\d]+', '')
       chunk[phoneColName] = chunk[phoneColName].str.replace(' ', '')
       chunk.to_csv(strippedLeadsPath,  mode='a', columns = [phoneColName], header = False, index = False)

    return strippedLeadsPath   


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
  
    leadsfileName     = str(sys.argv[1])
    phoneColName      = str(sys.argv[2])
    orginalLeadsCount = len(pd.read_csv(leadsfileName)) + 1
    
    extractedleadspath = extractNumsFromLeads(leadsfileName, phoneColName)
    strippedleadspath  = remove_non_numeric(extractedleadspath, 'phone')
    validleadspath     = removeNonValidNums(strippedleadspath)

    afterFormatCount   = len(pd.read_csv(validleadspath)) + 1
    #returnStatDict     =   "removed" + "-" +  orginalLeadsCount - afterFormatCount 
                         

    print "removed-" + str(orginalLeadsCount - afterFormatCount) + ",orignalcount-" + str(orginalLeadsCount) + ",aftercount-" + str(afterFormatCount)


if __name__ == '__main__':
    main()
   