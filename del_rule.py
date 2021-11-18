from utilities import *
from flask import request
import collections

def rule_del_existence():
    a = request.form["act1"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile()   
    remove = []
    for act in removeSegment:
        if a not in act:        
            segments.append(act)
        else : 
            if act not in segments:
                remove.append(act)    
    writeOnSegmentFile(segments)   
    writeOnRemoveSegmentFile(remove) 
    return segments, remove


def rule_del_absence():
    a = request.form["act1"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile()   
    remove = []
    for act in removeSegment:
        if a in act:
            segments.append(act)
        else : 
            if act in segments:
                remove.append(act)    
    writeOnSegmentFile(segments)   
    writeOnRemoveSegmentFile(remove) 
    return segments, remove

def rule_del_choice():
    a = request.form["act1"]
    b = request.form["act2"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile() 
    remove = []
    for act in removeSegment:
        if a not in act or b not in act:
            segments.append(act)
        else : 
            if act in segments:
                remove.append(act)         
    writeOnSegmentFile(segments)   
    writeOnRemoveSegmentFile(remove)
    return segments, remove


def rule_del_exclusive_choice():
    a = request.form["act1"]
    b = request.form["act2"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile() 
    remove = []
    for act in removeSegment:
        if a in act and b in act:
            segments.append(act)
        elif a not in act and b not in act:
            segments.append(act)
        else : 
            if act in segments:
                remove.append(act)   
    writeOnSegmentFile(segments)   
    writeOnRemoveSegmentFile(remove)
    return segments, remove

def rule_del_responded_existence():
    a = request.form["act1"]
    b = request.form["act2"]
    segments = takeSegmentFromFile()
    removeSegment = takeRemoveSegmentFromFile() 
    remove = []
    for act in removeSegment:
        if b not in act and a in act:
            segments.append(act)
        else : 
            if act in segments:
                remove.append(act)     
    writeOnSegmentFile(segments)   
    writeOnRemoveSegmentFile(remove)
    return segments, remove
