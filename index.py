from pm4py.objects.log.exporter.xes import exporter as xes_exporter
import pm4py
import collections


log = pm4py.read_xes("log.xes")
print("\n log ", log)
t = log[0]
print("\n trace ", t) #prints the first trace of the log
ev = log[0][0]
print("\n event ", ev) #prints the first event of the first trace
act = ev["concept:name"]
print("\n act \n", act) #take activity



##Take all the activities from the file xes
allXESActivities = []
for trace in log:
    activities = []
    for event in trace:
        activities.append(event["concept:name"])
    allXESActivities.append(activities)    

allActivities = []
for act in allXESActivities:
    if act not in allActivities:
        allActivities.append(act)
print("\n all \n", allActivities)        



#xes_exporter.apply(log, 'export.xes')



###FUNCTION DECLARE
a = 'A'
b = 'B'

#array_existence = [['B', 'C','A', 'C'],['B', 'C','A','A','C'], ['B', 'C', 'C'],['C']]
def existence(a):
    result = []
    for act in allActivities:
        if a in act:        
            result.append(act)
    print("\n existence \n", result)            
    return result

existence(a)


#array_absence = [['B', 'C', 'C'], ['B', 'C','A', 'C'], ['B', 'C','A','A','C'], ['B', 'C','A', 'C', 'A']]
def absence(a):
    result = []
    for act in allActivities:
        if a not in act:
            result.append(act)
    print("\n absence \n", result)            
    return result

absence(a)


#array_choice = [['B', 'C', 'C'], ['B', 'C','A', 'C'], ['C']]
def choice(a, b):
    result = []
    for act in allActivities:
        if a in act or b in act:
            result.append(act)
    print("\n choice \n", result)            
    return result        

choice(a, b)


#array_exclusiveChoice = [['B', 'C', 'C'], ['A', 'C', 'C'], ['B', 'C','A', 'C'], ['C']]
def exclusiveChoice(a, b):
    result = []
    for act in allActivities:
        if a in act and b not in act:
            result.append(act)
        elif b in act and a not in act:
            result.append(act)
    print("\n exlcusive choice \n", result)            
    return result        

exclusiveChoice(a, b)


#array_respondedExistence = [['B', 'C', 'A', 'A', 'C'], ['B', 'C', 'C'], ['C', 'A', 'A', 'C'], ['A', 'C', 'C']]
def respondedExistence(a, b):
    result = []
    for act in allActivities:
        if b not in act and a  not in act:
            result.append(act)
        elif a in act and b in act:
            result.append(act) 
        elif a not in act:
            result.append(act)      
    print("\n responded existence \n", result)            
    return result 

respondedExistence(a, b)


#array_response = [['C', 'A', 'A', 'C', 'B'], ['B', 'C', 'C'], ['C', 'A', 'A', 'C'], ['B', 'A', 'C', 'C']]
def response(a, b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            position_a = act.index(a)
            position_b = act.index(b)     
            if position_b > position_a:
                result.append(act) 
        elif a not in act:
            result.append(act)        
    print("\n response \n", result)            
    return result

response(a, b)                                        


#array_alternateResponse = [['C', 'A', 'C', 'B'], ['A', 'B', 'C', 'A','C','B'], ['C', 'A', 'A', 'C', 'B'], ['B', 'A', 'C', 'A', 'C', 'B'], ['A', 'B', 'B', 'A']]
def alternateResponse(a, b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            counter = collections.Counter(act)
            if counter[a] == 1:
                position_a = act.index(a)
                position_b = act.index(b)     
                if position_b > position_a:
                    result.append(act) 
            elif counter[a] > 1:
                list_a = []
                list_b = []
                count = -1
                for elem in act:
                    count += 1
                    if elem == a:
                        list_a.append(count)
                    elif elem == b:
                        list_b.append(count)            
                i = 0
                j = 0
                for i in range(len(list_a)-1):
                    for j in range(len(list_b)-1):
                        if list_a[i] < list_b[j] and list_b[j] < list_a[i+1]and list_b[j+1] > list_a[i+1]:
                            result.append(act)
        elif a not in act:
            result.append(act)  
    print("\n alternate response \n", result)            
    return result

alternateResponse(a, b)            


#array_chainResponse = [['C', 'A', 'B', 'B'], ['A', 'B', 'C', 'A','B'], ['C', 'A','C', 'B'], ['B','C', 'A'], ['A', 'B', 'B', 'A']]
def chainResponse(a, b):
    result = []
    for act in allActivities:
        if a in act and b in act:
            counter = collections.Counter(act)
            if counter[a] == 1:
                for elem in range(len(act)-1):
                    if act[elem] == a and act[elem+1] == b:
                        result.append(act) 
            elif counter[a] > 1:
                list_a = []
                list_b = []
                count = -1
                for elem in act:
                    count += 1
                    if elem == a:
                        list_a.append(count)
                    elif elem == b:
                        list_b.append(count)            
                i = 0
                j = 0
                for i in range(len(list_a)):
                    for j in range(len(list_b)):
                        if list_a[i] + 1 == list_b[j]:
                            if act not in result:
                                result.append(act) 
                        else:
                            if act in result: 
                                result.remove(act)
                           
        elif a not in act:
            result.append(act)  
    print("\n chain response \n", result)            
    return result

chainResponse(a, b)


#array_precedence = [['C', 'A','C', 'B', 'B'], ['A', 'C', 'C'], ['C', 'C','B', 'B'], ['B','A','C', 'C'], ['A', 'B', 'B', 'A']]
def precedence(a,b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            position_a = act.index(a)
            position_b = act.index(b)     
            if position_b > position_a:
                result.append(act) 
        elif b not in act:
            result.append(act)
    print("\n precedence \n", result)            
    return result        

precedence(a,b)


#array_alternatePrecedence = [['C', 'A', 'C', 'B', 'A'], ['A', 'B', 'C','A', 'A','C','B'], ['C', 'A','C','B', 'B', 'A'], ['A', 'B', 'B', 'A', 'B', 'C', 'B']]
def alternatePrecedence(a, b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            counter = collections.Counter(act)
            if counter[b] == 1:
                position_a = act.index(a)
                position_b = act.index(b)     
                if position_a < position_b:
                    result.append(act) 
            elif counter[b] > 1:
                list = []
                for elem in act:
                    if elem == a:
                        list.append(a)
                    elif elem == b:
                        list.append(b)            
                i = 0
                j = 0
                for i in range(len(list)-1):
                    if list[i] != list[i+1] and act not in result:
                        result.append(act)
                    elif list[i] == a and list[i+1] == a and act not in result:
                        result.append(act)
                    elif list[i] == b and list[i+1] == b and act in result:
                        result.remove(act)
                        break      
        elif b not in act:
            result.append(act)    
    print("\n alternate precedence \n", result)            
    return result    

alternatePrecedence(a, b)


#array_chainPrecedence = [['A', 'B', 'C', 'A'], ['A', 'B','A', 'A','B','C'], ['B', 'C', 'A'], ['B','A', 'A','B','C','B']]
def chainPrecedence(a, b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            counter = collections.Counter(act)
            if counter[b] == 1:
                position_a = act.index(a)
                position_b = act.index(b)     
                if position_a < position_b:
                    result.append(act) 
            elif counter[b] > 1:
                list_a = []
                list_b = []
                count = -1
                for elem in act:
                    count += 1
                    if elem == a:
                        list_a.append(count)
                    elif elem == b:
                        list_b.append(count)            
                i = 0
                j = 0
                for i in range(len(list_b)):
                    for j in range(len(list_a)):
                        if list_a[j] + 1 == list_b[i]:
                            if act not in result:
                                result.append(act)
                        else:
                            if act in result:
                                result.remove(act) 
        elif b not in act:
            result.append(act)
    print("\n chain precedence \n", result)            
    return result    

chainPrecedence(a, b)   


#array_coExistence = [['C', 'A','C', 'B', 'B'], ['B', 'C', 'C', 'A'], ['C', 'A', 'C'], ['B','C', 'C']]
def coExistence(a, b):
    result = []
    for act in allActivities:
        if a in act and b in act:
            result.append(act)
    print("\n co existence \n", result)            
    return result

coExistence(a, b)


#array_succession = [['C', 'A','C', 'B', 'B'], ['A', 'C', 'C', 'B'], ['B', 'A', 'C'], ['B','C', 'C', 'A']]
def succession(a, b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            counter = collections.Counter(act)
            if counter[a] == 1:
                position_a = act.index(a)
                position_b = act.index(b)     
                if position_a < position_b:
                    result.append(act)         
        elif a not in act and b in act:
            result.append(act)            
    print("\n succession \n", result)            
    return result

succession(a, b)    


#array_alternateSuccession = [['C', 'A','C', 'B', 'A', 'B'], ['A', 'B', 'C', 'A', 'B', 'C'], ['C', 'A', 'A', 'B', 'B'], ['B','A', 'C']]
def alternateSuccession(a, b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            counter = collections.Counter(act)
            if counter[a] == 1 and counter[b] == 1:
                position_a = act.index(a)
                position_b = act.index(b)     
                if position_a < position_b:
                    result.append(act) 
            elif counter[a] > 1 and counter[b] > 1:
                list_a = []
                list_b = []
                count = -1
                for elem in act:
                    count += 1
                    if elem == a:
                        list_a.append(count)
                    elif elem == b:
                        list_b.append(count)            
                i = 0
                j = 0
                for i in range(len(list_b)-1):
                    for j in range(len(list_a)-1):
                        if list_a[j] < list_b[i] and list_a[j+1] > list_b[i]:
                            if act not in result:
                                result.append(act)
                        else:
                            if act in result:
                                result.remove(act) 
        elif a not in act and b in act:
            result.append(act)   
    print("\n alternate succession \n", result)            
    return result

alternateSuccession(a, b)


#array_chainSuccession = [['C', 'A', 'B', 'A', 'B'], ['C', 'C', 'C'], ['C', 'A', 'C', 'B'], ['C', 'B','A', 'C']]
def chainSuccession(a, b):
    result = []
    for act in allActivities:
        if a in act and b in act:
            list_a = []
            list_b = []
            count = -1
            for elem in act:
                count += 1
                if elem == a:
                    list_a.append(count)
                elif elem == b:
                    list_b.append(count)            
            i = 0
            j = 0
            for i in range(len(list_b)):
                for j in range(len(list_a)):
                    if list_a[j] + 1 == list_b[i]:
                        if act not in result:
                            result.append(act)
                    else:
                        if act in result:
                            result.remove(act) 
        elif a not in act and b not in act:
            result.append(act)   
    print("\n chain succession \n", result)            
    return result

chainSuccession(a, b)   


#array_notCoExistence = [['C', 'C', 'C', 'B', 'B', 'B'], ['C', 'C', 'A', 'C'], ['A', 'C', 'C', 'B', 'B'], ['B', 'C', 'A', 'C']]
def notCoExistence(a, b):
    result = []
    for act in allActivities:
        if a in act and b not in act:
            result.append(act)
        elif a not in act and b in act:
            result.append(act)
        elif a not in act and b not in act:
            result.append(act)         
    print("\n not co existence \n", result)            
    return result

notCoExistence(a, b)


#array_notSuccession = [['B', 'B', 'C', 'A', 'A'], ['C', 'B', 'B', 'C', 'A'], ['A', 'A', 'C', 'B', 'B'], ['A', 'B', 'B']]
def notSuccession(a, b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            counter = collections.Counter(act)
            if counter[a] == 1 and counter[b] == 1:
                position_a = act.index(a)
                position_b = act.index(b)     
                if position_a > position_b:
                    result.append(act) 
            else:
                list_a = []
                list_b = []
                count = -1
                for elem in act:
                    count += 1
                    if elem == a:
                        list_a.append(count)
                    elif elem == b:
                        list_b.append(count)            
                i = 0
                j = 0
                for i in range(len(list_b)):
                    for j in range(len(list_a)):
                        if list_a[j] > list_b[i]:
                            if act not in result:
                                result.append(act)
                        else:
                            if act in result:
                                result.remove(act) 

        elif a in act and b not in act:
            result.append(act)
        elif a not in act and b in act:
            result.append(act)
        else:
            result.append(act)                    
    print("\n not succession \n", result)            
    return result

notSuccession(a, b) 


#array_notChainSuccession = [['A', 'C', 'B', 'A', 'C', 'B'], ['B', 'B', 'A', 'A'], ['A', 'B', 'C', 'A', 'B'], ['C', 'A', 'B', 'C']]
def notChainSuccession(a, b):
    result = []
    position_a = 0
    position_b = 0
    for act in allActivities:
        if a in act and b in act:
            counter = collections.Counter(act)
            if counter[a] == 1 and counter[b] == 1:
                position_a = act.index(a)
                position_b = act.index(b)     
                if position_b > position_a + 1:
                    result.append(act)
                elif position_b < position_a:
                    result.append(act)     
            else:
                list_a = []
                list_b = []
                count = -1
                for elem in act:
                    count += 1
                    if elem == a:
                        list_a.append(count)
                    elif elem == b:
                        list_b.append(count)            
                i = 0
                j = 0
                for i in range(len(list_a)):
                    for j in range(len(list_b)):
                        if list_b[j] > list_a[i] + 1:
                            if act not in result:
                                result.append(act)
                        elif list_b[j] < list_a[i]:
                            if act not in result:
                                result.append(act)
                        else: 
                            if act in result:
                                result.remove(act)                
        elif a not in act and b not in act:
            result.append(act)
    print("\n not chain succession \n", result)            
    return result

notChainSuccession(a, b)    