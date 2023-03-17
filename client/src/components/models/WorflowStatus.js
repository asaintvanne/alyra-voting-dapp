export const RegisteringVoters = '0';
export const ProposalsRegistrationStarted = '1';
export const ProposalsRegistrationEnded = '2';
export const VotingSessionStarted = '3';
export const VotingSessionEnded = '4';
export const VotesTallied = '5';

export const getWorkflowStatus = (status) => {
    switch (status) {
        case RegisteringVoters:
            return 'Registering Voters';
        case ProposalsRegistrationStarted:
            return 'Proposals Registration Started';
        case ProposalsRegistrationEnded:
            return 'Proposals Registration Ended';
        case VotingSessionStarted:
            return 'Voting Session Started';
        case VotingSessionEnded:
            return 'Voting Session Ended';
        case VotesTallied:
            return 'Votes Tallied';
        default:
            return 'Unknown';
    }
}