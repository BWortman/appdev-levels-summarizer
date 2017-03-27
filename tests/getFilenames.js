'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const fs = require('fs');
const path = require('path');

const getFilenames = require('../app/getFilenames');

const expect = chai.expect;

chai.use(chaiAsPromised);

describe('getFilenames', () => {
  describe('with mix of file types', () => {
    let readdirSyncStub;
    let statSyncStub;
    const directoryName = 'c:/testing';
    const match1 = 'foo.xlsx';
    const match2 = 'bar.xlsx';
    const noMatch = 'no_match.jpg';
    const subDir = './xlsx';

    beforeEach(() => {
      readdirSyncStub = sinon.stub(fs, 'readdirSync', (dirName) => {
        if (dirName === directoryName) {
          return [match1, noMatch, match2, subDir];
        } else {
          throw new Error(`Unexpected directory name '${dirName}'.`);
        }
      });
      statSyncStub = sinon.stub(fs, 'statSync', (filename) => {
        return {
          isFile: () => true
        };
      });
    });

    it('returns only files of target type', () => {
      return getFilenames(directoryName)
        .then((filenames) => {
          expect(filenames).to.eql([
            path.join(directoryName, match1),
            path.join(directoryName, match2)
          ]);
        });
    });

    afterEach(() => {
      readdirSyncStub.restore();
      statSyncStub.restore();
    });
  });
});
