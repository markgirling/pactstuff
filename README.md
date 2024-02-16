# Contract Testing

An example of using pact to create contract tests.

The tests are between a consumer and provider. The consumer declares responses and behaviours it expects from the provider, and the provider tests itself to see if it meets those expectations.

In this example, the consumer is a nodejs program that outputs a film review to the console. To get its data, it makes a HTTP request to a reviews web service (the provider).

The consumer expects the review service to output a review object when it requests a review with a valid review ID. It also expects the review service to output an empty object when it requests a review with an invalid ID.

The review service reads this set of expectations that was generated from the consumer, and runs tests against itself to see if it does indeed ouput the correct objects under the right circumstances.

If it does, the contract is fulfilled and the tests pass. The consumer knows what to expect from the provider, and so, for example, it can use mock objects in its tests that match the response body defined in the contract.

The tests fail if that contract is not fulfilled. E.g. if the consumer expects the provier to output a field which the provider actually does not output.

## Setup

Run `npm install` and to run the tests run `npm run test`.
