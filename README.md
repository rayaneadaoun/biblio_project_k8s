# Library Project

# *Table of contents*
1. [Description](#description)
2. [Source code](#source)
3. [Kubernetes ressources](#k8s)
4. [Deploy](#deploy)

## *Description*
- This project contains the source code of an api coded in *springboot* , and the code of a front service, the whole composes the elements of a website of a library that allows the user to create an account and thus consult the books available to reserve them.
- This project contains also the kubernetes configuration ressources to deploy the source code on a gke cluster .

## *Source code*
- Springboot api => [back](back) folder
- front service  => [front](front) folder
- k8s ressources => [k8s_ressources](k8s_ressources) folder


## *Kubernetes ressources*
### *k8s_ressources/project_deployment folder*
- There is a k8s configuration file for the deployment of each service on the cluster, with images that will be pulled from a repository on the gcp atrefact registry, and that are pushed through a github actions pipeline beforehand. 

### *k8s_ressources/traefik folder*
- There is a K8s configuration to create an ingress controller with traefik with an opening on ports 80 and 443 
```
$ kubectl apply -f k8s_ressources/traefik/crd.yml
$ kubectl apply -f k8s_ressources/traefik/traefik.yml
```

## *Deploy*
- You can deploy this project locally with docker container , to do that see this [readme](back/Readme.md)

- To deploy this project on kubernetes cluster , for example on GKE, first we need to install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) on your workstation and import your k8s cluster configuration file .

- First deploy storage ressources ,then mysql deployment 
```
$ kubectl apply -f k8s_ressources/project_deployment/storage.yml
$ kubectl apply -f k8s_ressources/project_deployment/deploy-mysql.yml
```
- Then deploy registry and gateway services 
```
$ kubectl apply -f k8s_ressources/project_deployment/deploy-registry.yml
$ kubectl apply -f k8s_ressources/project_deployment/deploy-gateway.yml
```
- Finally , you can deploy all the other services .

- To expose the font-service on the internet , we have to create an ingressroutetcp and bind it with the front service.
```
$ kubectl apply -f  k8s_ressources/project_deployment/ingressroutetcp.yml
```