import React from 'react';
import { Button, Modal } from '@deriv/components';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import { RootStore } from 'Types';

type TCryptoTransactionsCancelModalProps = {
    cancelCryptoTransaction: (selected_crypto_transaction_id: string) => void;
    hideCryptoTransactionsCancelModal: () => void;
    is_cancel_modal_visible: boolean;
    selected_crypto_transaction_id: string;
};

const CryptoTransactionsCancelModal = ({
    cancelCryptoTransaction,
    hideCryptoTransactionsCancelModal,
    is_cancel_modal_visible,
    selected_crypto_transaction_id,
}: TCryptoTransactionsCancelModalProps) => {
    return (
        <React.Fragment>
            <Modal
                small
                title={localize('Cancel transaction')}
                is_open={is_cancel_modal_visible}
                toggleModal={hideCryptoTransactionsCancelModal}
                has_close_icon
            >
                <Modal.Body>
                    <Localize i18n_default_text='Are you sure you want to cancel this transaction?' />
                </Modal.Body>
                <Modal.Footer>
                    <Button text={localize('No')} onClick={hideCryptoTransactionsCancelModal} large secondary />
                    <Button
                        text={localize('Yes')}
                        onClick={() => {
                            cancelCryptoTransaction(selected_crypto_transaction_id);
                        }}
                        large
                        primary
                    />
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default connect(({ modules }: RootStore) => ({
    cancelCryptoTransaction: modules.cashier.transaction_history.cancelCryptoTransaction,
    hideCryptoTransactionsCancelModal: modules.cashier.transaction_history.hideCryptoTransactionsCancelModal,
    is_cancel_modal_visible: modules.cashier.transaction_history.is_crypto_transactions_cancel_modal_visible,
    selected_crypto_transaction_id: modules.cashier.transaction_history.selected_crypto_transaction_id,
}))(CryptoTransactionsCancelModal);
