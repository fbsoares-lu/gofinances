import React from 'react';
import { useState } from 'react';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
} from './styles';
import { Category } from '../../components/Form/Category';

export function Register() {
    const [transactionType, setTransactionType] = useState('');

    function handleTansactionType(type: 'up' | 'down') {
        setTransactionType(type);
    }

    return (
        <Container>

            <Header>
             <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />

                    <TransactionsType>
                        <TransactionTypeButton
                            title="Income"
                            type="up"
                            onPress={() => handleTansactionType('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton
                            title="Outcome"
                            type="down"
                            onPress={() => handleTansactionType('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsType>

                    <Category title="Category"/>
                </Fields>
                
                <Button title="Enviar"/>
            </Form>
            
        </Container>
    )
};