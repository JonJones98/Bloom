from unittest import result
import pymongo
import os
from dotenv import load_dotenv
load_dotenv()
try:
  client = pymongo.MongoClient(os.getenv("MongoDB_Connection_String"))

# return a friendly error if a URI error is thrown 
except pymongo.errors.ConfigurationError:
  print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
  os.exit(1)

db = client.bloom

# use a collection named Users
Users_collection = db["users"]
Business_Cards_collection = db["business_cards"]
Resumes_collection = db["resumes"]
Business_Plans_collection = db["business_plans"]
Budgets_collection = db["budgets"]
Internal_Content_collection = db["internal_content"]



class Internal_Content:
    def __init__(self, data):
        self.id=data["_id"]
        self.name = data["name"]
        self.content = data["value"]
        self.dateCreated = data["dateCreated"]
        self.dateUpdated = data["dateUpdated"]
    #Read
    @classmethod
    def find(cls):
        results = Internal_Content_collection.find()
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def find_one(cls,query):
        results = Internal_Content_collection.find_one(query)
        return cls(results) if results else None
    #Update
    @classmethod
    def update_many(cls,query):
        results = Internal_Content_collection.update_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def update_one(cls, filter, update):
        results = Internal_Content_collection.update_one(filter, update)
        return results
    #Create
    @classmethod
    def insert_many(cls,query):
        results = Internal_Content_collection.insert_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def insert_one(cls,query):
        results = Internal_Content_collection.insert_one(query)
        return results
    #Delete
    @classmethod
    def delete_many(cls,query):
        results = Internal_Content_collection.delete_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def delete_one(cls,query):
        results = Internal_Content_collection.delete_one(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
class Users:
    def __init__(self, data):
        self.id = data["_id"]
        self.role = data["role"]
        self.name = data["name"]
        self.key = data["key"]
        self.email = data["email"]
        self.dateCreated = data.get("dateCreated")
        self.dateUpdated = data.get("dateUpdated")
    #Read
    @classmethod
    def find(cls):
        results = Users_collection.find()
        data = []
        for result in results:
            result['_id'] = str(result['_id'])
            data.append((result))
        return data
    @classmethod
    def find_one(cls, query):
        results = Users_collection.find_one(query)
        data = []
        if results:
            results['_id'] = str(results['_id'])
            data.append((results))
            return data[0]
        return None
    @classmethod
    def find_many(cls,query):
        results = Users_collection.find(query)
        data = []
        for result in results:
            result['_id'] = str(result['_id'])
            data.append(cls(result))
        return data
    #Update
    @classmethod
    def update_many(cls,query):
        results = Users_collection.update_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def update_one(cls,filter,update):
        results = Users_collection.update_one(filter, update)
        return results
    #Create
    @classmethod
    def insert_many(cls,query):
        results = Users_collection.insert_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def insert_one(cls,query):
        results = Users_collection.insert_one(query)
        return results
    #Delete
    @classmethod
    def delete_many(cls,query):
        results = Users_collection.delete_many(query)
        return results.deleted_count
    @classmethod
    def delete_one(cls,query):
        results = Users_collection.delete_one(query)
        return results.deleted_count
class Business_Cards:
    def __init__(self, data):
        self.id=data["_id"]
        self.name = data["name"]
        self.type = data["type"]
        self.content = data["content"]
        self.dateCreated = data["dateCreated"]
        self.dateUpdated = data["dateUpdated"]
    #Read
    @classmethod
    def find(cls):
        results = Business_Cards_collection.find()
        data = []
        for result in results:
            result['_id'] = str(result['_id'])
            data.append(cls(result))
        return data
    @classmethod
    def find_one(cls,query):
        results = Business_Cards_collection.find_one(query)
        if results:
            results['_id'] = str(results['_id'])
        return cls(results) if results else None
    @classmethod
    def find_many(cls,query):
        results = Business_Cards_collection.find(query)
        data = []
        for result in results:
            result['_id'] = str(result['_id'])
            data.append(cls(result))
        return data
    #Update
    @classmethod
    def update_many(cls,query):
        results = Business_Cards_collection.update_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def update_one(cls, filter, update):
        results = Business_Cards_collection.update_one(filter, update)
        return results
    #Create
    @classmethod
    def insert_many(cls,query):
        results = Business_Cards_collection.insert_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def insert_one(cls,query):
        results = Business_Cards_collection.insert_one(query)
        return results
    #Delete
    @classmethod
    def delete_many(cls,query):
        results = Business_Cards_collection.delete_many(query)
        print(results)
        return results
    @classmethod
    def delete_one(cls,query):
        results = Business_Cards_collection.delete_one(query)
        return results
class Resumes:
    def __init__(self, data):
        self.id=data["_id"]
        self.name = data["name"]
        self.type = data["type"]
        self.content = data["content"]
        self.dateCreated = data["dateCreated"]
        self.dateUpdated = data["dateUpdated"]
    #Read
    @classmethod
    def find(cls):
        results = Resumes_collection.find()
        data = []
        for result in results:
            result['_id'] = str(result['_id'])
            data.append(cls(result))
        return data
    @classmethod
    def find_one(cls,query):
        results = Resumes_collection.find_one(query)
        if results:
            results['_id'] = str(results['_id'])
            return cls(results)
        return None
    @classmethod
    def find_many(cls,query):
        results = Resumes_collection.find(query)
        data = []
        for result in results:
            result['_id'] = str(result['_id'])
            data.append(cls(result))
        return data
    #Update
    @classmethod
    def update_many(cls,query):
        results = Resumes_collection.update_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def update_one(cls, filter, update):
        results = Resumes_collection.update_one(filter, update)
        return results
    #Create
    @classmethod
    def insert_many(cls,query):
        results = Resumes_collection.insert_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def insert_one(cls,query):
        results = Resumes_collection.insert_one(query)
        return results
    #Delete
    @classmethod
    def delete_many(cls,query):
        results = Resumes_collection.delete_many(query)
        return results.deleted_count
    @classmethod
    def delete_one(cls,query):
        results = Resumes_collection.delete_one(query)
        return results.deleted_count
class Business_Plans:
    def __init__(self, data):
        self.id=data["_id"]
        self.name = data["name"]
        self.type = data["type"]
        self.content = data["content"]
        self.dateCreated = data["dateCreated"]
        self.dateUpdated = data["dateUpdated"]
    #Read
    @classmethod
    def find(cls):
        results = Business_Plans_collection.find()
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def find_one(cls, filter, update):
        results = Business_Plans_collection.find_one(filter, update)
        return cls(results) if results else None
    @classmethod
    def find_many(cls,query):
        results = Business_Plans_collection.find(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    #Update
    @classmethod
    def update_many(cls,query):
        results = Business_Plans_collection.update_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def update_one(cls, filter, update):
        results = Business_Plans_collection.update_one(filter, update)
        return results
    #Create
    @classmethod
    def insert_many(cls,query):
        results = Business_Plans_collection.insert_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def insert_one(cls,query):
        results = Business_Plans_collection.insert_one(query)
        return results
    #Delete
    @classmethod
    def delete_many(cls,query):
        results = Business_Plans_collection.delete_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def delete_one(cls,query):
        results = Business_Plans_collection.delete_one(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
class Budgets:
    def __init__(self, data):
        self.id=data["_id"]
        self.name = data["name"]
        self.type = data["type"]
        self.content = data["content"]
        self.dateCreated = data["dateCreated"]
        self.dateUpdated = data["dateUpdated"]
    #Read
    @classmethod
    def find(cls):
        results = Budgets_collection.find()
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def find_one(cls, filter, update):
        results = Budgets_collection.find_one(filter, update)
        return cls(results) if results else None
    @classmethod
    def find_many(cls,query):
        results = Budgets_collection.find(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    #Update
    @classmethod
    def update_many(cls,query):
        results = Budgets_collection.update_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def update_one(cls, filter, update):
        results = Budgets_collection.update_one(filter, update)
        return results
    #Create
    @classmethod
    def insert_many(cls,query):
        results = Budgets_collection.insert_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def insert_one(cls,query):
        results = Budgets_collection.insert_one(query)
        return results
    #Delete
    @classmethod
    def delete_many(cls,query):
        results = Budgets_collection.delete_many(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data
    @classmethod
    def delete_one(cls,query):
        results = Budgets_collection.delete_one(query)
        data = []
        for result in results:
            data.append(cls(result))
        return data



