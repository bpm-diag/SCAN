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
