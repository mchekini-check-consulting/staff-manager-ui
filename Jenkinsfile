node("ci-node") {

  stage("checkout") {
    checkout scmGit(branches: [[name: '*/develop']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mchekini-check-consulting/staff-manager-ui']])
  }

  stage("Quality Analyses"){

    sh "/opt/sonar-scanner/bin/sonar-scanner \\\n" +
      "  -Dsonar.projectKey=staff-manager-ui \\\n" +
      "  -Dsonar.sources=./src \\\n" +
      "  -Dsonar.host.url=http://ci.check-consulting.net:11001 \\\n" +
      "  -Dsonar.token=sqp_a818bc464ceb4985bea7af89114471cde4b9842b"
  }

  stage("build") {
    sh "npm install"
    sh "npm run build"
  }

  stage("build image") {
    sh "sudo docker build -t staff-manager-ui ."
  }

  stage("push docker image") {

    withCredentials([usernamePassword(credentialsId: 'mchekini', usernameVariable: 'username',
      passwordVariable: 'password')]) {
      sh "sudo docker login -u mchekini -p $password"
      sh "sudo docker tag staff-manager-ui mchekini/staff-manager-ui:1.0"
      sh "sudo docker push mchekini/staff-manager-ui:1.0"
      sh "sudo docker rmi mchekini/staff-manager-ui:1.0"
      sh "sudo docker rmi staff-manager-ui"
      stash includes: 'docker-compose.yml', name: 'utils'
    }
  }

  node("apps-integration"){
    stage("deploy"){
      unstash 'utils'
      try{
        sh "sudo docker-compose down"
        sh "sudo docker-compose pull"
        sh "sudo docker-compose up -d"

      }catch (Exception e){
        println "No Running Docker Compose Running"
        sh "sudo docker-compose pull"
        sh "sudo docker-compose up -d"
      }

    }
  }


}
