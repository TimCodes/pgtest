import sys
import pandas as pd

def mergeDnc(inputFileName, outputFileName):
    for chunk in pd.read_csv(inputFileName, chunksize=100000, dtype = str, names= ['areacode','phone']):
            chunk['combined'] = chunk['areacode'] + chunk['phone']
            chunk.to_csv(outputFileName,  mode='a', columns = ['combined'], header = False, index = False)


def main(): 
    print 'wtf'
    #inputfileName = str(sys.argv[1])
    #outFileName   = str(sys.argv[2])
   # print  str(sys.argv[1])
    mergeDnc(str(sys.argv[1]),  str(sys.argv[2]))


if __name__ == '__main__':
    main()
   