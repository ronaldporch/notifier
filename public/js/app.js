let app = angular.module('notifier', [])
let socket = io('/')

app.controller('notifierController', ['$scope', '$http', function($scope, $http) {
  $scope.name = 'Ronald'
  socket.on('apis.read', results => {
    $scope.$apply(() => { $scope.apis = results })
  })
  $scope.deleteMonitor = (id) => {
    $scope.apis = $scope.apis.filter(api => api.id != id)
    if (id.length > 0) socket.emit('apis.delete', id)
  }
  $scope.addApi = () => {
    $scope.apis.push( { name: "", url: "", interval: 0, string: "", id: "" } )
  }
  $scope.update = () => { socket.emit('apis.update', $scope.apis) }
}])
