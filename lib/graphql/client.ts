import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const graphqlEndpoint = "https://graphql.anilist.co";

const httpLink = new HttpLink({
  uri: graphqlEndpoint,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        fields: {
          media: {
            keyArgs: ["season", "seasonYear"],
          },
        },
      },
      Query: {
        fields: {
          Page: {
            keyArgs: (_, { variables }) => {
              return [variables?.season, "" + variables?.seasonYear];
            },
            merge(existing, incoming, { args, variables, readField }) {
              const mediaArgs = {
                season: variables?.season,
                seasonYear: variables?.seasonYear,
              };

              const existingMediaField = existing
                ? readField({
                    fieldName: "media",
                    args: mediaArgs,
                    from: existing,
                  })
                : [];

              const existingMedia = Array.isArray(existingMediaField)
                ? existingMediaField
                : [];

              const incomingMediaField = incoming
                ? readField({
                    fieldName: "media",
                    args: mediaArgs,
                    from: incoming,
                  })
                : [];

              const incomingMedia = Array.isArray(incomingMediaField)
                ? incomingMediaField
                : [];

              console.log(incoming);
              return {
                ...incoming,
                ['media:{"season":"' +
                variables?.season +
                '","seasonYear":' +
                variables?.seasonYear +
                "}"]: [...existingMedia, ...incomingMedia],
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
