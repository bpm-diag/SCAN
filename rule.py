from utilities import *
from flask import request

def rule_existence():
    a = request.form["act1"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile()   
    result = []
    for act in segments:
        if a in act:        
            result.append(act)
        else : 
            if act not in removeSegment:
                removeSegment.append(act)    
    writeOnSegmentFile(result)   
    writeOnRemoveSegmentFile(removeSegment) 
    return result, removeSegment

def rule_absence():
    a = request.form["act1"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile()   
    result = []
    for act in segments:
        if a not in act:
            result.append(act)
        else : 
            if act not in removeSegment:
                removeSegment.append(act)    
    writeOnSegmentFile(result)   
    writeOnRemoveSegmentFile(removeSegment) 
    return result, removeSegment

def rule_choice():
    a = request.form["act1"]
    b = request.form["act2"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile() 
    result = []
    for act in segments:
        if a in act or b in act:
            result.append(act)
        else : 
            if act not in removeSegment:
                removeSegment.append(act)     
    writeOnSegmentFile(result)   
    writeOnRemoveSegmentFile(removeSegment)
    return result, removeSegment

def rule_exclusive_choice():
    a = request.form["act1"]
    b = request.form["act2"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile() 
    result = []
    for act in segments:
        if a in act and b not in act:
            result.append(act)
        elif b in act and a not in act:
            result.append(act)
        else : 
            if act not in removeSegment:
                removeSegment.append(act)     
    writeOnSegmentFile(result)   
    writeOnRemoveSegmentFile(removeSegment)
    return result, removeSegment
     
def rule_responded_existence():
    a = request.form["act1"]
    b = request.form["act2"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile() 
    result = []
    for act in segments:
        if b not in act and a  not in act:
            result.append(act)
        elif a in act and b in act:
            result.append(act) 
        elif a not in act:
            result.append(act)  
        else : 
            if act not in removeSegment:
                removeSegment.append(act)     
    writeOnSegmentFile(result)   
    writeOnRemoveSegmentFile(removeSegment)
    return result, removeSegment