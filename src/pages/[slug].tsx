import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { BlockRenderer, PageHeader, PageWrapper } from '@components/core';
import { Box, Container } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import Error from 'next/error';
import React from 'react';
import { PageDocument, PageQuery, PageQueryVariables } from '../graphql';

type Props = {
  page: PageQuery['page'];
};

const Page: NextPage<Props> = ({ page }) => {
  if (page == null) {
    return <Error statusCode={404} />;
  }
  return (
    <PageWrapper>
      <NextSeo
        title={page.seo?.title ?? ''}
        description={page.seo?.description ?? ''}
        openGraph={{
          title: page.seo?.openGraphTitle ?? '',
          description: page.seo?.openGraphDescription ?? '',
        }}
      />
      <PageHeader image={page.featuredImage?.node} title={page.title} />
      <Container>
        <Box sx={{ mb: 6, mt: 4 }}>
          <BlockRenderer>{page.content}</BlockRenderer>
        </Box>
      </Container>
    </PageWrapper>
  );
};

Page.getInitialProps = async (
  context: NextPageContext & { apolloClient: ApolloClient<NormalizedCacheObject> },
) => {
  const page = await context.apolloClient
    .query<PageQuery, PageQueryVariables>({
      query: PageDocument,
      variables: {
        slug: `${context.query.slug}`,
      },
    })
    .then(({ data }) => {
      if (context.res != null && data?.page == null) {
        context.res.statusCode = 404;
      }
      return data?.page;
    });
  return { page };
};

export default Page;
