import React from 'react';
import { useQuery } from 'react-query';
import { UnorderedList } from '@chakra-ui/react';
import { rKey } from '../../../../lib/utils/querykeys';
import { getPendingRequests } from '../../../../lib/api/handler/account';
import { OnlineLabel } from '../../../sections/OnlineLabel';
import { RequestListItem } from '../../../items/RequestListItem';

export const PendingList: React.FC = () => {
  const { data } = useQuery(rKey, () =>
      getPendingRequests().then(response => response.data),
    {
      staleTime: 0
    }
  );

  return (
    <>
      <UnorderedList listStyleType='none' ml='0' w='full' mt='2'>
        <OnlineLabel label={`Pending — ${data?.length || 0}`} />
        {data?.map((r) =>
          <RequestListItem request={r} key={r.id} />
        )}
      </UnorderedList>
    </>
  );
}
