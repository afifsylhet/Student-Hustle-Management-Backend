class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // MongoDB regular expression
            $options: "i", // i for case-insensitive,
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  roomSearch() {
    const keyword = this.queryStr.keyword
      ? {
        roomNumber: {
            $regex: this.queryStr.keyword, // MongoDB regular expression
            $options: "i", // i for case-insensitive,
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  incomeSearch() {
    const keyword = this.queryStr.keyword
      ? {
          borderId: {
            $regex: this.queryStr.keyword, // MongoDB regular expression
            $options: "i", // i for case-insensitive,
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  expenceSearch() {
    const keyword = this.queryStr.keyword;

    if (keyword) {
        this.query = this.query.find({ _id: keyword });
    }

    return this;
}


  filter() {
    const queryCopy = { ...this.queryStr };
    //removing some fields
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key => `$${key}`)
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
  
    this.query = this.query.skip(skip).limit(resultPerPage);
    return this;
  }
}

module.exports = ApiFeatures;
