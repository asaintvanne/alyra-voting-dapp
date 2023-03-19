export const RegisteringVoters = '0';
export const ProposalsRegistrationStarted = '1';
export const ProposalsRegistrationEnded = '2';
export const VotingSessionStarted = '3';
export const VotingSessionEnded = '4';
export const VotesTallied = '5';

export const getWorkflowStatus = (status) => {
    switch (status) {
        case RegisteringVoters:
            return 'Enregistrement des votants';
        case ProposalsRegistrationStarted:
            return 'Soumission des propositions';
        case ProposalsRegistrationEnded:
            return 'Fin de soumission des propositions';
        case VotingSessionStarted:
            return 'Vote en cours';
        case VotingSessionEnded:
            return 'Vote terminé';
        case VotesTallied:
            return 'Dépouillement';
        default:
            return 'Unknown';
    }
}