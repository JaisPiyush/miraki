# Backend API docs

```py
BASE_URL = http://localhost:8000/api/
```

* All the descriptions marked with `@author <name>`, the person will be responsible for developing the frontend.
* `Authentication Required: True` mean, API call requires a logged in user. If any backend error thrown (401 or 403) in such apis then user should be redirected to login.


## Snapshot MVP Implementation: Performable Tasks

### User Authentication

* **Web3 Wallet Login**: The user must be able to securely connect their Web3-compatible wallet (e.g., MetaMask) to authenticate their identity on the platform.


### Space Management

* **Create a Space**: The user should be able to create a new space. This requires defining:

* **Get All My Spaces**:  The user should be able to retrieve a list of all the spaces they have created or are a member of.
    ```ts
    GET /space/profile/
    Authentication Required: True
    @author Sandesh

    interface ReadOnlySpace {
        id: number;
        name: string;
        uid: null | string;
        private: boolean;
        about: null | string;
        avatar: null | string;
        members_count: number;
        active_proposals: number;
        proposals_count: number;
        creator: number | object;
        settings: object;
    }
    return Array<ReadOnlySpace>
    ```

* **Update Space**: The user should be able to modify certain attributes of a space they own or have administrative rights within.  This might include:

* **Follow a Space**: The user should be able to follow a space to receive updates and participate in proposals within that space.
    ```ts
    PUT /space/profile/<pk>/join
    Authentication Required: True
    @author Sandesh

    return ReadOnlySpace
    ```

### Proposal Management

* **Create a Proposal**: The user should be able to initiate a new proposal within a space they are a member of. This involves:
    ```ts
    POST /proposal/space/
    Authentication Required: True
    @author Sandesh

    interface CreateProposalRequestBody {
        space: number;
        title: string;
        description: string;
        // Options of voting, multiple choice single select basis
        options: string[];
        strategy_details: {
            name: 'token_balance_per_vote',
            token_address: string;
            min_balance_per_vote: number
        };
        start_timestamp: Date //yyyy-mm-ddTHH:MM:SS format
        end_timestamp: Date // same format as above
        member_quorum: number // any value between 0-1, quorum is % of total votes required to pass the proposal (0.51 or 51%) is the norm

    }

    interface ReadOnlySpaceProposal extends CreateProposalRequestBody {
        id: number;
        space: ReadOnlySpace;
        creator: number;
        // Count of how much vote for each options
        vote_selected_options_count: Record<string, number>;
        votes_count: number;
        // Indicating whether the logged in user has voted
        // if undefined or false that mean not voted
        has_voted?: boolean;
        // Whether proposal reach it's quorum or not
        quorum_reached?: boolean;

    }

    return ReadOnlySpaceProposal;


    ```

* **View All Proposals in Space**:  The user should be able to see a list of all active and past proposals within a particular space.
    ```ts
    GET /proposal/space/<pk>/
    Authentication Required: False
    @author Sandesh

    return Array<ReadOnlySpaceProposal>;

    ```

* **View Details of Proposal Using ID**: The user should be able to access the full details of a specific proposal by providing its unique proposal ID.
    ```ts
    GET /proposal/<pk>/
    Authentication Required: False
    @author Sandesh

    return ReadOnlySpaceProposal;

    ```

    * If proposal has `end_timestamp` less than current date time then proposal will be considered expired.
    * Already voted proposals will not accept second entry.

* **Vote on Proposal**: The user should be able to cast their vote on a proposal if they meet the eligibility criteria set within the space's governance rules.
    ```ts
    POST /proposal/vote/
    Authentication Required: True
    @author Sandesh

    interface CreateProposalVoteRequestBody {
        // id of proposal
        proposal: number;
        // selected option from the proposal
        vote_selected_option: string;
    }
    ```


