const Orchestra = require("../../models/orchestras");
const User = require("../../models/users");
const Member = require("../../models/members");
const { transformOrchestra } = require("./transforms");

module.exports = {
  Query: {
    //
    // Orchestras
    //
    orchestras: async (_, __, { isAuth, userId, loaders }) => {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const orchestras = await Orchestra.find({ _id: { $in: user.memberOf } });

      return orchestras.map(orchestra =>
        transformOrchestra(orchestra.id, loaders)
      );
    },

    //
    // Single Orchestra
    //
    orchestraById: async (_, { orchestraId }, { isAuth, loaders }) => {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }

      const orchestra = await Orchestra.findById(orchestraId);

      return transformOrchestra(orchestra.id, loaders);
    }
  },

  Mutation: {
    //
    // Create Orchestra
    //
    createOrchestra: async (_, args, { isAuth, userId, loaders }) => {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }

      const orchestra = await Orchestra.create({
        name: args.name,
        owner: userId
      });

      const owner = await User.findById(userId);

      if (!owner) {
        throw new Error("User doesn't exist");
      }
      owner.createdOrchestras.push(orchestra);
      owner.memberOf.push(orchestra);
      await owner.save();

      // Add user as member of the orchestra
      const member = await Member.create({
        user: owner.id,
        orchestra: orchestra.id
      });

      orchestra.members.push(member);
      const result = await orchestra.save();

      return transformOrchestra(result.id, loaders);
    }
  }
};
