import { Avatar, Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Channel, DMChannel } from '../../lib/api/models';
import { RouterProps } from '../../routes/Routes';

export const StartMessages: React.FC = () => {
  const { guildId } = useParams<RouterProps>();
  return (guildId === undefined) ? <DMStartMessages /> : <ChannelStartMessages />;
};

const ChannelStartMessages: React.FC = () => {

  const { guildId, channelId } = useParams<RouterProps>();

  const { data } = useQuery<Channel[]>(`channels-${guildId}`);
  const channel = data?.find(c => c.id === channelId);

  return (
    <Flex
      alignItems='center'
      mb='2'
      justify='center'
    >
      <Box textAlign={'center'}>
        <Heading>Welcome to #{channel?.name}</Heading>
        <Text>This is the start of the #{channel?.name} channel</Text>
      </Box>
    </Flex>
  );
};

const DMStartMessages: React.FC = () => {

  const { channelId } = useParams<RouterProps>();

  const { data } = useQuery<DMChannel[]>('dms');
  const channel = data?.find(c => c.id === channelId);

  return (
    <Box m='4'>
      <Avatar h={'80px'} w={'80px'} src={channel?.user.image} />
      <Heading mt={2}>{channel?.user.username}</Heading>
      <Text textColor={'brandGray.accent'}>
        This is the beginning of your direct message history with
        @{channel?.user.username}
      </Text>
      <Divider mt={2} />
    </Box>
  );
};

