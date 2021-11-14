def takeActions(allActivities):
    activities = []
    for seg in allActivities:
        for act in seg: 
            if act not in activities:
                activities.append(act)
    sortActivity = sorted(activities)            
    return sortActivity    

def takeSegmentFromFile():  
    segments = []  
    with open('segments.txt', 'r') as f:
        for line in f:
            s = []
            for elem in line:
                if elem != "[" and elem != "]" and elem != "," and elem != "'" and elem != " " and elem != "\n":
                    s.append(elem)
            segments.append(s)
    return segments

def takeRemoveSegmentFromFile():  
    segments = []  
    with open('removeSegments.txt', 'r') as f:
        for line in f:
            s = []
            for elem in line:
                if elem != "[" and elem != "]" and elem != "," and elem != "'" and elem != " " and elem != "\n":
                    s.append(elem)
            segments.append(s)
    return segments       

def writeOnSegmentFile(result):
     with open('segments.txt', 'w') as f:
        for line in result:
            f.write(str(line))
            f.write("\n")
        f.close()
        
def writeOnRemoveSegmentFile(removeSegment):
    with open('removeSegments.txt', 'w') as f:
        for line in removeSegment:
            f.write(str(line))
            f.write("\n")
        f.close()   