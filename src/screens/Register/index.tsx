import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-native';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
} from './styles';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    function handleTansactionType(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
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

                    <CategorySelectButton 
                        onPress={handleOpenSelectCategoryModal}
                        title={category.name}
                    />
                </Fields>
                
                <Button title="Enviar"/>
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                   category={category}
                   setCategory={setCategory}
                   closeSelectCategory={handleCloseSelectCategoryModal} 
                />
            </Modal>
            
        </Container>
    )
};