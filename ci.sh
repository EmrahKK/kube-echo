#!/bin/bash
tag=$(git tag --points-at HEAD|grep "^v.*")            
if [ -z "$tag" ]
then
      docker build -t emrahkk/kube-echo:latest .                  
else
      docker build -t emrahkk/kube-echo:latest -t emrahkk/kube-echo:$tag .
      docker push emrahkk/kube-echo:$tag
fi                     
docker push emrahkk/kube-echo:latest
