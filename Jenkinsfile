pipeline {
  agent any

  tools {
    nodejs "Node18"
  }

  stages {

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(credentials: ['ec2-ssh']) {
          sh '''
            scp -o StrictHostKeyChecking=no -r dist/* ubuntu@ec2-65-1-111-82.ap-south-1.compute.amazonaws.com:/var/www/react-app/
          '''
        }
      }
    }

    stage('Test') {
      when {
        expression { false }   // still disabled
      }
      steps {
        sh 'npm test -- --watchAll=false'
      }
    }
  }

  post {
    success {
      echo '✅ Build Successful & Deployed 🚀'
    }
    failure {
      echo '❌ Build Failed'
    }
  }
}
