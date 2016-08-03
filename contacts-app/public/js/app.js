angular.module("myApp", ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "home.html",
				controller: "contactsCtrl",
				resolve: {
					contacts: function(Contacts) {
						return Contacts.getContacts();
					}
				}
			})

			.when("/new", {
				controller: "newCtrl",
				templateUrl: "new.html"
			})

			.when("/contact/:contactId", {
				controller: "editCtrl",
				templateUrl: "contact.html"
			})

			.otherwise({
				redirectTo: "/"
			})
	})

	.service("Contacts", function($http) {
		this.getContacts = function() {
			return $http.get("/contacts").
			then(function(response) {
				return response;
			}, function(response) {
				alert("Error finding contacts.");
			});
		}

		this.createContact = function(contact) {
			return $http.post("/add", contact).
			then(function(response) {
				return response;
			}, function(response) {
				alert("Error creating contact.");
			});
		}

		this.getContact = function(contactId) {
			var url = "/contact/" + contactId;
			return $http.get(url).
			then(function(response) {
				return response;
			}, function(response) {
				alert("Error finding this contact.");
			});
		}

		this.editContact = function(contact) {
			var url = "/editcontact/" + contact._id;
			console.log(contact._id);
			return $http.put(url, contact).
			then(function(response) {
				return response;
			}, function(response) {
				alert("Error editing this contact.");
			});
		}

		this.deleteContact = function(contactId) {
			var url = "/delete/" + contactId;
			return $http.delete(url).
			then(function(response) {
				return response;
			}, function(response) {
				alert("Error deleting this contact.");
			});
		}
	})

	.controller("contactsCtrl", function(contacts, $scope) {
		$scope.contacts = contacts.data;
	})

	.controller("newCtrl", function($scope, $location, Contacts) {
		$scope.saveContact = function(contact) {
			Contacts.createContact(contact).then(function(doc) {
				var contactUrl = "/add/" + doc.data._id;
				$location.path(contactUrl);
			}, function(response) {
				alert(response);
			});
		}
	})

	.controller("editCtrl", function($scope, $routeParams, Contacts) {
		Contacts.getContact($routeParams.contactId).then(function(doc) {
			$scope.contact = doc.data;
		}, function(response) {
			alert(response);
		});
		$scope.edit = function() {
			$scope.editMode = true;
			$scope.contactFormUrl = "new.html";
		}
		$scope.saveContact = function(contact) {
			Contacts.editContact(contact);
			$scope.editMode = false;
			$scope.contactFormUrl = "";
		}
		$scope.deleteContact = function(contactId) {
			Contacts.deleteContact(contactId);
		}
	});