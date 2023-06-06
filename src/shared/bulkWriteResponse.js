export function resetFetchBulkWriteResult() {
  return {
    insertedCount: 0,
    matchedCount: 0,
    modifiedCount: 0,
    deletedCount: 0,
    upsertedCount: 0,
  };
}

export function updateFetchBulkWriteResult(bulkWriteResult, response) {
  return {
    insertedCount: bulkWriteResult.insertedCount + response.insertedCount,
    matchedCount: bulkWriteResult.matchedCount + response.matchedCount,
    modifiedCount: bulkWriteResult.modifiedCount + response.modifiedCount,
    deletedCount: bulkWriteResult.deletedCount + response.deletedCount,
    upsertedCount: bulkWriteResult.upsertedCount + response.upsertedCount,
  };
}
