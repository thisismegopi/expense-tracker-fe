import { Card, Container, Flex, Stack, Tabs, rem } from '@mantine/core';
import { IconBrandCashapp, IconBuildingBank, IconDashboard } from '@tabler/icons-react';

import { useCallback, useState } from 'react';
import axiosInstance from './services/axios';
import { GetTransactions, TransactionApiFactory, TransactionType } from './services/open-api';

const { getTransactions, createTransaction } = TransactionApiFactory(undefined, '', axiosInstance);

const demoProps = {
    h: 50,
    mt: 'md',
};
const iconStyle = { width: rem(12), height: rem(12) };

export function App() {
    const [allTransactions, setAllTransactions] = useState<GetTransactions | null>(null);

    const getTransactionHandler = useCallback(() => {
        getTransactions().then(res => {
            if (res.status === 200) {
                setAllTransactions(res.data);
            }
        });
    }, []);

    const createTransactionHandler = () => {
        createTransaction({ amount: 100, dateTime: new Date().toISOString(), categoryId: '1313f3d8-e554-43be-917b-f754163a8195', transactionType: TransactionType.Expense });
    };

    return (
        <Container size="xs" {...demoProps}>
            <Tabs defaultValue="gallery">
                <Tabs.List grow>
                    <Tabs.Tab value="gallery" leftSection={<IconDashboard style={iconStyle} />}>
                        Dashboard
                    </Tabs.Tab>
                    <Tabs.Tab value="messages" leftSection={<IconBuildingBank style={iconStyle} />}>
                        Income
                    </Tabs.Tab>
                    <Tabs.Tab value="settings" leftSection={<IconBrandCashapp style={iconStyle} />}>
                        Expense
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="gallery">
                    {allTransactions ? (
                        <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} mt={8} justify={{ sm: 'center' }}>
                            <Card shadow="sm" padding="lg" radius="md" w={'100%'} withBorder>
                                <Stack>{allTransactions.totalIncome}</Stack>
                                <Stack>Total Income</Stack>
                            </Card>
                            <Card shadow="sm" padding="lg" radius="md" w={'100%'} withBorder>
                                <Stack>{allTransactions.totalExpense}</Stack>
                                <Stack>Total Expense</Stack>
                            </Card>
                            <Card shadow="sm" padding="lg" radius="md" w={'100%'} withBorder>
                                <Stack>{allTransactions.totalTransactions}</Stack>
                                <Stack>Total Transactions</Stack>
                            </Card>
                        </Flex>
                    ) : (
                        'No data found..'
                    )}
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    {allTransactions
                        ? allTransactions.transactions
                              .filter(t => t.transactionType === TransactionType.Income)
                              .map(r => (
                                  <Card shadow="sm" padding="lg" radius="md" w={'100%'} withBorder>
                                      {r.transactionType + ' | ' + r.amount}
                                  </Card>
                              ))
                        : 'No data found...'}
                </Tabs.Panel>

                <Tabs.Panel value="settings">
                    {allTransactions
                        ? allTransactions.transactions
                              .filter(t => t.transactionType === TransactionType.Expense)
                              .map(r => (
                                  <Card shadow="sm" padding="lg" radius="md" w={'100%'} withBorder>
                                      {r.transactionType + ' | ' + r.amount}
                                  </Card>
                              ))
                        : 'No data found...'}
                </Tabs.Panel>
            </Tabs>
            <button onClick={getTransactionHandler}>Update Transactions</button>
            <button onClick={createTransactionHandler}>Create Dummy Transaction</button>
        </Container>
    );
}
