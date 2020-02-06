import { gql } from "apollo-boost";

//
// Queries
//
export const loginDocument = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;

export const userListDocument = gql`
  query {
    users {
      _id
      name
    }
  }
`;

export const userDocument = gql`
  query {
    user {
      _id
      name
      email
      firstName
      lastName
      city
      birthdate
      bio
    }
  }
`;

export const orchestraListDocument = gql`
  query {
    orchestras {
      _id
      name
      members {
        _id
        user {
          _id
          name
        } 
      }
    }
  }
`;

export const orchestraDocument = gql`
  query($orchestraId: String!) {
    orchestra(orchestraId: $orchestraId) {
      _id
      name
      channels {
        _id
        name
      }
      members {
        _id
        user {
          _id
          name
        }
      }
    }
  }
`;

export const invitesDocument = gql`
  query {
    invites {
      _id
      subject {
        _id
        name
      }
      from {
        name
      }
      createdAt
    }
  }
`;

export const notificationsDocument = gql`
  query {
    invites {
      _id
    }
  }
  # add other queries that qualify as notification
`;

export const channelMessagesDocument = gql`
  query channelMessages($orchestraId: String!, $channelId: String!) {
    channelMessages(
      orchestraId: $orchestraId
      channelId: $channelId
      filters: {
        contexts: [CHAT, SUPERCOLLIDER]
        formats: [PLAIN_TEXT, JSON, SC_RAW, SC_LANG]
      }
    ) {
      _id
      from {
        user {
          _id
        }
      }
      body
      format
      context
    }
  }
`;

export const privateMessagesDocument = gql`
  query privateMessages($orchestraId: String!, $memberId: String!) {
    privateMessages(
      orchestraId: $orchestraId
      memberId: $memberId
      filters: {
        contexts: [CHAT, SUPERCOLLIDER]
        formats: [PLAIN_TEXT, JSON, SC_RAW, SC_LANG]
      }
    ) {
      _id
      from {
        _id
        user {
          _id
          name
        }
      }
      body
      format
      context
    }
  }
`;

export const channelDocument = gql`
  query channel($orchestraId: String!, $channelId: String!) {
    channel(orchestraId: $orchestraId, channelId: $channelId) {
      _id
      name
    }
  }
`;

export const memberDocument = gql`
  query member($orchestraId: String!, $memberId: String!) {
    member(orchestraId: $orchestraId, memberId: $memberId) {
      _id
      user {
        _id
        name
      }
    }
  }
`;

//
// Mutations
//
export const registerDocument = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;

export const updateUserDocument = gql`
  mutation updateUser($userInput: UserInput!) {
    updateUser(userInput: $userInput) {
      name
      email
      firstName
      lastName
      city
      birthdate
      bio
    }
  }
`;

export const createOrchestraDocument = gql`
  mutation createOrchestra($name: String!) {
    createOrchestra(name: $name) {
      _id
    }
  }
`;

export const updateOrchestraDocument = gql`
  mutation updateOrchestra($orchestraId: String!, $name: String) {
    updateOrchestra(
      orchestraId: $orchestraId
      orchestraInput: { name: $name }
    ) {
      _id
      name
    }
  }
`;

export const deleteOrchestraDocument = gql`
  mutation deleteOrchestra($orchestraId: String!) {
    deleteOrchestra(orchestraId: $orchestraId) {
      _id
    }
  }
`;

export const sendInviteDocument = gql`
  mutation sendInvite($orchestraId: String!, $email: String!) {
    sendInvite(orchestraId: $orchestraId, email: $email) {
      _id
      pending
      createdAt
    }
  }
`;

export const acceptInviteDocument = gql`
  mutation acceptInvite($inviteId: String!) {
    acceptInvite(inviteId: $inviteId) {
      _id
    }
  }
`;

export const denyInviteDocument = gql`
  mutation denyInvite($inviteId: String!) {
    denyInvite(inviteId: $inviteId) {
      _id
    }
  }
`;

export const sendChannelMessageDocument = gql`
  mutation sendChannelMessage(
    $orchestraId: String!
    $channelId: String!
    $format: MessageFormat!
    $context: MessageContext!
    $body: String!
  ) {
    sendChannelMessage(
      orchestraId: $orchestraId
      channelId: $channelId
      messageInput: { format: $format, context: $context, body: $body }
    ) {
      _id
    }
  }
`;

export const sendPrivateMessageDocument = gql`
  mutation sendPrivateMessage(
    $orchestraId: String!
    $memberId: String!
    $format: MessageFormat!
    $context: MessageContext!
    $body: String!
  ) {
    sendPrivateMessage(
      orchestraId: $orchestraId
      memberId: $memberId
      messageInput: { format: $format, context: $context, body: $body }
    ) {
      _id
    }
  }
`;

//
// Subscriptions
//
export const userJoinedDocument = gql`
  subscription {
    userJoined {
      _id
      email
    }
  }
`;

export const newMemberDocument = gql`
  subscription($orchestraId: String!) {
    newMember(orchestraId: $orchestraId) {
      user {
        _id
        name
      }
    }
  }
`;

export const newInviteDocument = gql`
  subscription {
    newInvite {
      _id
      subject {
        _id
        name
      }
      from {
        name
      }
      createdAt
    }
  }
`;
