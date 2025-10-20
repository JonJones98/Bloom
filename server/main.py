import uuid
import fastapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import datetime
from models.Bloom_DB_Mongo import *  # Assuming this is the correct import for your
from bson import ObjectId
# Create FastAPI app with automatic documentation
app = FastAPI(
    title="Bloom API",
    description="A FastAPI server for the Bloom application, part of the Life Collection project.",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc
    openapi_url="/openapi.json"  # OpenAPI schema
)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)
# Pydantic models for request/response validation
class WelcomeResponse(BaseModel):
    message: str
    api_docs: str
    interactive_docs: str

class ReadmeResponse(BaseModel):
    readme_content: str
    source: str

class UserCreateRequest(BaseModel):
    name: str
    key: str
    role: str
    email: str
class UserUpdateRequest(BaseModel):
    id: Optional[str] = None
    _id: Optional[str] = None
    name: Optional[str] = None
    key: Optional[str] = None
    role: Optional[str] = None
    email: Optional[str] = None
    dateUpdated: Optional[datetime.datetime] = None

class ResumeCreateRequest(BaseModel):
    name: str
    type: str
    content: Dict[str, Any]
class ResumeUpdateRequest(BaseModel):
    id: Optional[str] = None
    _id: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    dateUpdated: Optional[datetime.datetime] = None

class BusinessCardCreateRequest(BaseModel):
    name: str
    type: str
    content: Dict[str, Any]
class BusinessCardUpdateRequest(BaseModel):
    id: Optional[str] = None
    _id: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    dateUpdated: Optional[datetime.datetime] = None

class BusinessPlanCreateRequest(BaseModel):
    name: str
    type: str
    content: Dict[str, Any]
class BusinessPlanUpdateRequest(BaseModel):
    id: Optional[str] = None
    _id: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    dateUpdated: Optional[datetime.datetime] = None

class BudgetCreateRequest(BaseModel):
    name: str
    type: str
    content: Dict[str, Any]
class BudgetUpdateRequest(BaseModel):
    id: Optional[str] = None
    _id: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    dateUpdated: Optional[datetime.datetime] = None

@app.get("/", response_model=WelcomeResponse, summary="Welcome Endpoint", tags=["General"])
def read_root() -> WelcomeResponse:
    """
    Welcome endpoint that provides basic information about the API.
    
    Returns:
        WelcomeResponse: Welcome message with links to documentation
    """
    return WelcomeResponse(
        message="Welcome to Bloom API",
        api_docs="Visit /docs for interactive API documentation (Swagger UI)",
        interactive_docs="Visit /redoc for alternative documentation (ReDoc)"
    )

@app.get("/readme", response_model=ReadmeResponse, summary="Get README Content", tags=["Documentation"])
def read_readme() -> ReadmeResponse:
    """
    Get the README content for the project.
    
    Returns:
        ReadmeResponse: The README file content
        
    Raises:
        HTTPException: If README file is not found
    """
    try:
        with open("README.md", "r") as f:
            content = f.read()
        return ReadmeResponse(
            readme_content=content,
            source="README.md"
        )
    except FileNotFoundError:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="README.md file not found")

@app.get("/health", summary="Health Check", tags=["Health"])
def health_check() -> Dict[str, Any]:
    """
    Health check endpoint to verify the API is running.
    
    Returns:
        dict: Health status information
    """
    return {
        "status": "healthy",
        "service": "Bloom API",
        "version": "1.0.0"
    }

#Users Collection
@app.get("/db/users")
def get_users():
    try:
        users = Users.find()
        users_list = []
        for user in users:
            # Handle the user object safely
            if hasattr(user, '__dict__'):
                user_dict = {}
                for key, value in user.__dict__.items():
                    if isinstance(value, ObjectId):
                        user_dict[key] = str(value)
                    elif isinstance(value, datetime.datetime):
                        user_dict[key] = value.isoformat()
                    else:
                        user_dict[key] = value
                users_list.append(user_dict)
            else:
                # If user is already a dict from MongoDB
                users_list.append(user)
        return {"users": users_list}
    except Exception as e:
        return {"error": f"Failed to retrieve users: {str(e)}"}
@app.get("/db/user")
def get_user(user_data: UserUpdateRequest):
    try:
        # Build update dictionary with only provided fields
        user = {}

        if user_data._id is not None:
            user["_id"] = user_data._id
        if user_data.id is not None:
            user["id"] = user_data.id
        if user_data.email is not None:
            user["email"] = user_data.email

        user = Users.find_one({**user})
        if user:
            # Serialize user object safely
            return {"user": user}
        else:
            return {"error": "User not found"}
    except Exception as e:
        return {"error": f"Failed to retrieve user: {e}"}
@app.post("/db/user/add")
def add_user(user_data: UserCreateRequest):
    # Define add_user_to_db function here or import it from models.Wanda_DB_Mongo
    random_id = uuid.uuid4()
    try:
        if Users.find_one({"email": user_data.email}):
            return {"status": f"User with email {user_data.email} already exists."}
        Users.insert_one({
            "name": user_data.name, 
            "role": user_data.role, 
            "key": user_data.key, 
            "email": user_data.email, 
            "id": str(random_id), 
            "dateCreated": datetime.datetime.now(), 
            "dateUpdated": datetime.datetime.now()
        })
        return {"status": f"Added user to database: {user_data.name}"}
    except Exception as e:
        return {"status": f"Failed to add user to database: {e}"}
@app.delete("/db/user/delete")
def delete_user(id: str):
    # Add logic to delete user from database
    try:
        delete_user = Users.delete_one({"id": id})
        if delete_user.deleted_count == 0:
            return {"status": f"User with id {id} not found"}
        
        return {"status": f"Deleted count: {delete_user.deleted_count}, Deleted user from database: {id}"}
    except Exception as e:
        return {"status": f"Failed to delete user from database: {e}"}
@app.delete("/db/users/delete")
def delete_all():
    # Add logic to delete user from database
    try:
        users = Users.delete_many({"role": {"$ne": "admin"}})
        return {"status": f"Deleted all {users} users except admins"}
    except Exception as e:
        return {"status": f"Failed to delete users from database: {e}"}
@app.patch("/db/user/update")
def update_user(id: str, update_data: UserUpdateRequest):
    # Add logic to update user in database
    try:
        # Build update dictionary with only provided fields
        update_fields = {"dateUpdated": datetime.datetime.now()}
        
        if update_data.name is not None:
            update_fields["name"] = update_data.name
        if update_data.key is not None:
            update_fields["key"] = update_data.key
        if update_data.role is not None:
            update_fields["role"] = update_data.role
        if update_data.email is not None:
            update_fields["email"] = update_data.email

        result = Users.update_one({"id": id}, {"$set": update_fields})
        
        if result.matched_count == 0:
            return {"status": f"User with id {id} not found"}
        
        return {"status": f"User updated successfully"}
    except Exception as e:
        return {"status": f"Failed to update user: {e}"}
    
#Dashboard Collection
@app.get("/db/dashboard")
def get_dashboard(id: str):
    try:
        reports=Users.find_many({"id":id})
        budget=Budgets.find_many({"id":id})
        business_cards=Business_Cards.find_many({"id":id})
        business_plans=Business_Plans.find_many({"id":id})

        dashboard = {
            "reports": {"count": len(reports), "documents": reports},
            "budgets": {"count": len(budget), "documents": budget},
            "business_cards": {"count": len(business_cards), "documents": business_cards},
            "business_plans": {"count": len(business_plans), "documents": business_plans}
        }
        return {"dashboard": dashboard}
    except Exception as e:
        return {"error": f"Failed to retrieve dashboard items: {str(e)}"}


#Resume Collection
@app.get("/db/resumes")
def get_resumes():
    try:
        resumes = Resumes.find()
        resumes_list = []
        for resume in resumes:
            # Handle the resume object safely
            if hasattr(resume, '__dict__'):
                resume_dict = {}
                for key, value in resume.__dict__.items():
                    if isinstance(value, ObjectId):
                        resume_dict[key] = str(value)
                    elif isinstance(value, datetime.datetime):
                        resume_dict[key] = value.isoformat()
                    else:
                        resume_dict[key] = value
                resumes_list.append(resume_dict)
            else:
                # If resume is already a dict from MongoDB
                resumes_list.append(resume)
        return {"resumes": resumes_list}
    except Exception as e:
        return {"error": f"Failed to retrieve resumes: {str(e)}"}
@app.get("/db/resume")
def get_resume(resume_data: ResumeUpdateRequest):
    try:
        # Build update dictionary with only provided fields
        resume = {}

        if resume_data._id is not None:
            resume["_id"] = resume_data._id
        if resume_data.id is not None:
            resume["id"] = resume_data.id
        if resume_data.name is not None:
            resume["name"] = resume_data.name

        resume = Resumes.find_one({**resume})
        if resume:
            # Serialize resume object safely
            return {"resume": resume}
        else:
            return {"error": "Resume not found"}
    except Exception as e:
        return {"error": f"Failed to retrieve resume: {e}"}
@app.post("/db/resume/add")
def add_resume(resume_data: ResumeCreateRequest):
    # Define add_user_to_db function here or import it from models.Wanda_DB_Mongo
    random_id = uuid.uuid4()
    try:
        if Resumes.find_one({"name": resume_data.name}):
            return {"status": f"Resume with name {resume_data.name} already exists."}
        Resumes.insert_one({
            "name": resume_data.name,
            "type": resume_data.type,
            "content": resume_data.content,
            "id": "resume_"+str(random_id),
            "dateCreated": datetime.datetime.now(), 
            "dateUpdated": datetime.datetime.now()
        })
        return {"status": f"Added resume to database: {resume_data.name}"}
    except Exception as e:
        return {"status": f"Failed to add resume to database: {e}"}
@app.delete("/db/resume/delete")
def delete_resume(id: str):
    # Add logic to delete resume from database
    try:
        delete_user = Resumes.delete_one({"id": id})
        if delete_user.deleted_count == 0:
            return {"status": f"User with id {id} not found"}
        
        return {"status": f"Deleted count: {delete_user.deleted_count}, Deleted resume from database: {id}"}
    except Exception as e:
        return {"status": f"Failed to delete resume from database: {e}"}
@app.delete("/db/resumes/delete")
def delete_all():
    # Add logic to delete resume from database
    try:
        resumes = Resumes.delete_many({"role": {"$ne": "admin"}})
        return {"status": f"Deleted all {resumes} resumes except admins"}
    except Exception as e:
        return {"status": f"Failed to delete resumes from database: {e}"}
@app.patch("/db/resume/update")
def update_resume(id: str, update_data: ResumeUpdateRequest):
    # Add logic to update resume in database
    try:
        # Build update dictionary with only provided fields
        update_fields = {"dateUpdated": datetime.datetime.now()}
        
        if update_data.name is not None:
            update_fields["name"] = update_data.name
        if update_data.type is not None:
            update_fields["type"] = update_data.type
        if update_data.content is not None:
            update_fields["content"] = update_data.content

        result = Resumes.update_one({"id": id}, {"$set": update_fields})
        
        if result.matched_count == 0:
            return {"status": f"Resume with id {id} not found"}

        return {"status": f"Resume updated successfully"}
    except Exception as e:
        return {"status": f"Failed to update resume: {e}"}

#Business Cards Collection
@app.get("/db/business_cards")
def get_business_cards():
    try:
        business_cards = Business_Cards.find()
        cards_list = []
        for card in business_cards:
            if hasattr(card, '__dict__'):
                card_dict = {}
                for key, value in card.__dict__.items():
                    if isinstance(value, ObjectId):
                        card_dict[key] = str(value)
                    elif isinstance(value, datetime.datetime):
                        card_dict[key] = value.isoformat()
                    else:
                        card_dict[key] = value
                cards_list.append(card_dict)
            else:
                cards_list.append(card)
        return {"business_cards": cards_list}
    except Exception as e:
        return {"error": f"Failed to retrieve business cards: {str(e)}"}
@app.get("/db/business_card")
def get_business_card(card_data: BusinessCardUpdateRequest,id: str):
    try:
        # Build update dictionary with only provided fields
        card = {}

        if card_data._id is not None:
            card["_id"] = card_data._id
        if card_data.id is not None:
            card["id"] = card_data.id
        if card_data.name is not None:
            card["name"] = card_data.name

        card = Business_Cards.find_one({**card, "id": id})
        if card:
            # Serialize card object safely
            return {"business_card": card}
        else:
            return {"error": "Business card not found"}
    except Exception as e:
        return {"error": f"Failed to retrieve business card: {e}"}
@app.post("/db/business_card/add")
def add_business_card(card_data: BusinessCardCreateRequest):
    random_id = uuid.uuid4()
    business_card_id = "business_card_" + str(random_id)
    try:
        if Business_Cards.find_one({"name": card_data.name}):
            return {"status": f"Business card with name {card_data.name} already exists."}
        Business_Cards.insert_one({
            "name": card_data.name,
            "type": card_data.type,
            "content": card_data.content,
            "id": business_card_id,
            "dateCreated": datetime.datetime.now(),
            "dateUpdated": datetime.datetime.now()
        })
        return {"status": f"Added business card to database: {card_data.name}", "id": business_card_id}
    except Exception as e:
        return {"status": f"Failed to add business card to database: {e}"}
@app.delete("/db/business_card/delete")
def delete_business_card(id: str):
    try:
        delete_result = Business_Cards.delete_one({"id": id})
        if delete_result.deleted_count == 0:
            return {"status": f"Business card with id {id} not found"}
        return {"status": f"Deleted count: {delete_result.deleted_count}, Deleted business card from database: {id}"}
    except Exception as e:
        return {"status": f"Failed to delete business card from database: {e}"}
@app.delete("/db/business_cards/delete")
def delete_all_business_cards():
    try:
        result = Business_Cards.delete_many({})
        return {"status": f"Deleted all {result.deleted_count} business cards"}
    except Exception as e:
        return {"status": f"Failed to delete business cards from database: {e}"}
@app.patch("/db/business_card/update")
def update_business_card(id: str, update_data: BusinessCardUpdateRequest):
    try:
        # Build update dictionary with only provided fields
        update_fields = {"dateUpdated": datetime.datetime.now()}
        
        if update_data.name is not None:
            update_fields["name"] = update_data.name
        if update_data.type is not None:
            update_fields["type"] = update_data.type
        if update_data.content is not None:
            update_fields["content"] = update_data.content

        result = Business_Cards.update_one({"id": id}, {"$set": update_fields})
        
        if result.matched_count == 0:
            return {"status": f"Business card with id {id} not found"}

        return {"status": f"Business card updated successfully"}
    except Exception as e:
        return {"status": f"Failed to update business card: {e}"}