pipeline {
    agent any

    environment {
        IMAGE_NAME = "nivriti:latest"
        CLUSTER_NAME = "kind"
    }

    stages {
        stage('1. Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('2. Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                // Changed from sh to bat for Windows compatibility
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('3. Load Image into Kubernetes') {
            steps {
                echo 'Loading image into Kind cluster...'
                bat "kind load docker-image ${IMAGE_NAME} --name ${CLUSTER_NAME}"
            }
        }

        stage('4. Deploy to Kubernetes Cluster') {
            steps {
                echo 'Applying Kubernetes manifests...'
                bat "kubectl apply -f deployment.yaml"
                bat "kubectl apply -f service.yaml"
            }
        }

        stage('5. Verify Rollout Deployment') {
            steps {
                echo 'Verifying Pod status...'
                bat "kubectl rollout status deployment/nivriti-deployment"
                bat "kubectl get pods"
                bat "kubectl get services"
            }
        }
    }
}
