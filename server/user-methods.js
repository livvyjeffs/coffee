Meteor.methods({
  /**
   * update a user's permissions
   *
   * @param {Object} targetUserId Id of user to update
   * @param {Array} roles User's new permissions
   * @param {String} group Company to update permissions for

   // where does UserID come from?

   */
   addSubscription: function (targetUserId, roles, group) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser) {
      throw new Meteor.Error(403, "Access denied")
  }

  Roles.setUserRoles(targetUserId, roles, group)
}
})