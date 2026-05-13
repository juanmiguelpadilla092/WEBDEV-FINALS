document.addEventListener('DOMContentLoaded', () => {
    // TAB SWITCHING LOGIC
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(target);
            if (!targetPane) return;

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            targetPane.classList.add('active');
        });
    });

    // PRICING TOGGLE (Monthly/Annual)
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const cycle = btn.getAttribute('data-cycle');
            updatePrices(cycle);
        });
    });

    function updatePrices(cycle) {
        const prices = {
            monthly: [29, 59, 99],
            annual: [299, 599, 999]
        };
        const amounts = document.querySelectorAll('.plan-price .amount');
        const terms = document.querySelectorAll('.plan-price .term');

        amounts.forEach((el, index) => {
            el.textContent = `$${prices[cycle][index]}`;
        });

        terms.forEach(el => {
            el.textContent = cycle === 'monthly' ? '/mo' : '/yr';
        });
    }

    // MODAL LOGIC
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const overlays = document.querySelectorAll('.modal-overlay');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).classList.add('show');
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('show');
        });
    });

    // Close on overlay click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('show');
        }
    });

    // MEMBERSHIP ACTION POPUPS
    const memberModal = document.getElementById('member-modal');
    const memberModalTitle = document.getElementById('member-modal-title');
    const memberModalBody = document.getElementById('member-modal-body');
    const memberModalAction = document.getElementById('member-modal-action');
    const memberModalClose = document.querySelector('.member-modal-close');
    const memberActionButtons = document.querySelectorAll('.open-member-modal');

    function closeMemberModal() {
        if (!memberModal) return;
        memberModal.classList.remove('show');
        memberModal.setAttribute('aria-hidden', 'true');
    }

    memberActionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!memberModal) return;
            memberModalTitle.textContent = btn.dataset.modalTitle || 'Membership Update';
            memberModalBody.textContent = btn.dataset.modalBody || 'Your request is ready.';
            memberModalAction.textContent = btn.dataset.modalAction || 'Continue';
            memberModal.classList.add('show');
            memberModal.setAttribute('aria-hidden', 'false');
        });
    });

    if (memberModalClose) {
        memberModalClose.addEventListener('click', closeMemberModal);
    }

    if (memberModalAction) {
        memberModalAction.addEventListener('click', closeMemberModal);
    }

    if (memberModal) {
        memberModal.addEventListener('click', (e) => {
            if (e.target === memberModal) closeMemberModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMemberModal();
    });

    // BILLING NAVIGATION SHORTCUT
    const billingBtn = document.getElementById('go-to-billing');
    if(billingBtn) {
        billingBtn.addEventListener('click', () => {
            document.querySelector('[data-tab="billing"]').click();
        });
    }
});
