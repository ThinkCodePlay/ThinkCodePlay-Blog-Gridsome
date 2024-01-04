---
title: "Kubernetes Summary"
date: "2023-12-12"
categories:
  - "tutorial"
tags: 
  - "docker"
  - "kubernetes"
cover: "../../../../../../../static/from-blog/cover-images/1.png"
---

# Kubernetes Summary

## building blocks

- Pod - is the smallest unit of deployment in Kubernetes. A Pod is a group of one or more containers. It contains container, volumes and resources. It reuqires Docker Kublet and Kube Proxy to run.
- Worker Node - is a server that runs the Kubernetes software and is ready to run pods. Like a virtual machine or physical server.
- Cluster - a set of Node machines which are running the Worker Nodes.
- Proxy - is a network proxy that runs on each worker node and is responsible for routing traffic to the appropriate container based on the IP address and port number of the incoming request.
- Mater Node / Control Plane - is a server that runs the Kubernetes software and is responsible for managing worker nodes.
- Cluster - is a group of one or more worker nodes and a master node. The master node manages the worker nodes and the pods in the cluster. This is then the confuguration to be used on the cloud provider.
- Worker Node components:
  - Kublet - Communication between Master and Worker Node.
  - Kube-Proxy - Managed Node and Pod network communication.
- Master Node components:
    - API Server - API for the kubelet to communicate.
    - Scheduler - Watches for new Pods, selects Worker Nods to run them on.
    - Kube-Controller-Manager - Wathces and controls Worker Nodes, correct number of Pods & more.
    - Cloud-Controller-Manager - Like Kube-Controller-Manager but for a specific cloud provider.
- Kubectl - A tool for sending instructions to the Cluster.