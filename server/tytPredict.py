
import pickle
import sys
modelPoint = pickle.load(open("./tytPrediction", 'rb'))
modelCluster = pickle.load(open("./clusterPrediction",'rb'))

turkish = float(sys.argv[1]) *4
math =  float(sys.argv[2]) *4
social =  float(sys.argv[3]) *2
fen =  float(sys.argv[4]) *2
total =  turkish + math + social + fen

prediction = modelPoint.predict([[turkish , math,fen , social, total]])
tytPoint = float(prediction[0])
tytPoint = round(tytPoint,2)


#cluster worst to best => 4-0-2-1-3
clusterEqu = {
    4 : 0,
    0 : 1,
    2 : 2,
    1: 3,
    3 : 4
}

cluster = modelCluster.predict([[total,tytPoint]])

print(tytPoint,"-",clusterEqu[cluster[0]])

sys.stdout.flush()

