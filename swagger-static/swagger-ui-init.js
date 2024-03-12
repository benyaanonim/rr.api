
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "default": {
              "description": "default endpoint"
            }
          }
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "summary": "Login as an admin",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdminInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Admin logged in successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseLogin"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/news": {
        "get": {
          "operationId": "NewsController_getNews",
          "summary": "Get all news",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Return all news",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/News"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "news"
          ]
        },
        "post": {
          "operationId": "NewsController_createNews",
          "summary": "Create news",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "$ref": "#/components/schemas/CreateNewsInput"
                }
              }
            }
          },
          "responses": {
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "news"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/news/{id}": {
        "get": {
          "operationId": "NewsController_getNewsById",
          "summary": "Get news by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "News ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return news by ID",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/News"
                  }
                }
              }
            },
            "404": {
              "description": "News not found"
            }
          },
          "tags": [
            "news"
          ]
        },
        "put": {
          "operationId": "NewsController_updateNews",
          "summary": "Update news",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "News ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateNewsInput"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "News updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/News"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "News not found"
            }
          },
          "tags": [
            "news"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "NewsController_deleteNews",
          "summary": "Delete news",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "News ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "News deleted"
            },
            "404": {
              "description": "News not found"
            }
          },
          "tags": [
            "news"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/news/tag/{tagId}": {
        "get": {
          "operationId": "NewsController_getNewsByTag",
          "summary": "Get news by tag",
          "parameters": [
            {
              "name": "tagId",
              "required": true,
              "in": "path",
              "description": "Tag ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return news by tag",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/News"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "news"
          ]
        }
      },
      "/tags": {
        "get": {
          "operationId": "TagController_getTags",
          "summary": "Get all tags",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Tag"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "tags"
          ]
        },
        "post": {
          "operationId": "TagController_createTag",
          "summary": "Create a new tag",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TagCreateInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Tag"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "tags"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/tags/{id}": {
        "put": {
          "operationId": "TagController_updateTag",
          "summary": "Update a tag",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the tag to update",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TagUpdateInput"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Tag"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "Tag not found"
            }
          },
          "tags": [
            "tags"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "TagController_deleteTag",
          "summary": "Delete a tag",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the tag to delete",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            },
            "404": {
              "description": "Tag not found"
            }
          },
          "tags": [
            "tags"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/categories": {
        "get": {
          "operationId": "CategoryController_getCategories",
          "summary": "Get all categories",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Category"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "categories"
          ]
        },
        "post": {
          "operationId": "CategoryController_createCategory",
          "summary": "Create a new category",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CategoryCreateInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Category"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "categories"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/categories/{id}": {
        "put": {
          "operationId": "CategoryController_updateCategory",
          "summary": "Update a category",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the category to update",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CategoryUpdateInput"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Category"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "Category not found"
            }
          },
          "tags": [
            "categories"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "CategoryController_deleteCategory",
          "summary": "Delete a category",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the category to delete",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            },
            "404": {
              "description": "Category not found"
            }
          },
          "tags": [
            "categories"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/feedback-form": {
        "get": {
          "operationId": "FormController_forms",
          "summary": "Retrieve all feedback forms",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of feedback forms",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Form"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "feedback-form"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "FormController_createForm",
          "summary": "Create a new feedback form",
          "description": "This endpoint is throttled to limit the number of requests.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateFormInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Feedback form created"
            },
            "400": {
              "description": "Bad request"
            },
            "429": {
              "description": "Limiting the number of creations of review forms, one per day"
            }
          },
          "tags": [
            "feedback-form"
          ]
        }
      },
      "/feedback-form/{formId}": {
        "put": {
          "operationId": "FormController_updateStatusForm",
          "summary": "Update a status feedback form",
          "description": "This endpoint is throttled to limit the number of requests.",
          "parameters": [
            {
              "name": "formId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateStatusFormInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Feedback form status update"
            },
            "400": {
              "description": "Bad request"
            },
            "429": {
              "description": "Rate limit"
            }
          },
          "tags": [
            "feedback-form"
          ]
        }
      },
      "/deputy": {
        "get": {
          "operationId": "DeputyController_deputies",
          "summary": "Get all deputies",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Return all deputies",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Deputy"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "deputy"
          ]
        },
        "post": {
          "operationId": "DeputyController_createDeputy",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Create a new deputy",
            "content": {
              "multipart/form-data": {
                "schema": {
                  "$ref": "#/components/schemas/CreateDeputyInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The deputy has been successfully created.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Deputy"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "deputy"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/deputy/{id}": {
        "put": {
          "operationId": "DeputyController_updateDeputy",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Deputy ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Update a deputy",
            "content": {
              "multipart/form-data": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateDeputyInput"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "The deputy has been successfully updated."
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "Deputy not found"
            }
          },
          "tags": [
            "deputy"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "DeputyController_deleteDeputy",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Deputy ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "The deputy has been successfully deleted."
            },
            "404": {
              "description": "Deputy not found"
            }
          },
          "tags": [
            "deputy"
          ]
        }
      }
    },
    "info": {
      "title": "News API",
      "description": "The News API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "news",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "AdminInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "string",
              "description": "The name of the admin"
            },
            "password": {
              "type": "string",
              "example": "string",
              "description": "The password of the admin"
            }
          },
          "required": [
            "name",
            "password"
          ]
        },
        "ResponseLogin": {
          "type": "object",
          "properties": {
            "accessToken": {
              "type": "string",
              "description": "JWT token"
            }
          },
          "required": [
            "accessToken"
          ]
        },
        "Tag": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "The unique identifier of the tag"
            },
            "name": {
              "type": "string",
              "description": "The name of the tag"
            },
            "link": {
              "type": "string",
              "description": "Link to resource"
            },
            "news": {
              "description": "The news associated with this tag",
              "type": "array",
              "items": {
                "type": "array"
              }
            }
          },
          "required": [
            "id",
            "name",
            "link",
            "news"
          ]
        },
        "Category": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "The unique identifier of the category"
            },
            "name": {
              "type": "string",
              "description": "The name of the category"
            },
            "news": {
              "description": "The news associated with this category",
              "items": {
                "type": "array"
              },
              "type": "array"
            }
          },
          "required": [
            "id",
            "name",
            "news"
          ]
        },
        "News": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "example": 1,
              "description": "The unique identifier of the news"
            },
            "title": {
              "type": "string",
              "example": "Breaking News",
              "description": "The title of the news"
            },
            "text": {
              "type": "string",
              "example": "This is the news text.",
              "description": "The text content of the news"
            },
            "viewCount": {
              "type": "number",
              "example": 0,
              "description": "The view count of the news"
            },
            "sources": {
              "example": [
                "source1",
                "source2"
              ],
              "description": "The sources of the news",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "image": {
              "type": "string",
              "example": "image.jpg",
              "description": "The image associated with the news"
            },
            "publicationDate": {
              "format": "date-time",
              "type": "string",
              "example": "2021-12-31T23:59:59Z",
              "description": "The publication date of the news"
            },
            "tags": {
              "description": "The tags associated with the news",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Tag"
              }
            },
            "category": {
              "description": "The categories associated with the news",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Category"
                }
              ]
            }
          },
          "required": [
            "id",
            "title",
            "text",
            "viewCount",
            "sources",
            "image",
            "publicationDate",
            "tags",
            "category"
          ]
        },
        "CreateNewsInput": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "sources": {
              "description": "Array of sources",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "categoryId": {
              "type": "number",
              "description": "Category Id"
            },
            "tags": {
              "description": "Array of tag IDs",
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            "image": {
              "type": "file",
              "format": "binary",
              "description": "Image file"
            }
          },
          "required": [
            "title",
            "text",
            "categoryId",
            "image"
          ]
        },
        "UpdateNewsInput": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "sources": {
              "description": "Array of sources",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "categoryId": {
              "description": "Array of category IDs",
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            "tags": {
              "description": "Array of tag IDs",
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            "image": {
              "type": "string",
              "format": "binary",
              "description": "Image file"
            }
          },
          "required": [
            "title",
            "text",
            "image"
          ]
        },
        "TagCreateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the tag"
            },
            "link": {
              "type": "string",
              "description": "Link to resource"
            }
          },
          "required": [
            "name",
            "link"
          ]
        },
        "TagUpdateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the tag"
            },
            "link": {
              "type": "string",
              "description": "Link to resource"
            }
          },
          "required": [
            "name",
            "link"
          ]
        },
        "CategoryCreateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the category"
            }
          },
          "required": [
            "name"
          ]
        },
        "CategoryUpdateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the category"
            }
          },
          "required": [
            "name"
          ]
        },
        "Form": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Unique identifier of the form"
            },
            "name": {
              "type": "string",
              "description": "Name of the person who submitted the form"
            },
            "email": {
              "type": "string",
              "description": "Email address of the person who submitted the form"
            },
            "text": {
              "type": "string",
              "description": "Text content of the form"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string",
              "description": "Created at Date form"
            },
            "status": {
              "type": "boolean",
              "description": "Feedback form processing status"
            },
            "updatedBy": {
              "type": "string",
              "description": "Name of the admin who updated the status of the feedback form"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string",
              "description": "Date and time when the status of the feedback form was updated"
            }
          },
          "required": [
            "id",
            "name",
            "email",
            "text",
            "createdAt",
            "status",
            "updatedBy",
            "updatedAt"
          ]
        },
        "CreateFormInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the person submitting the form"
            },
            "email": {
              "type": "string",
              "description": "Email address of the person submitting the form"
            },
            "text": {
              "type": "string",
              "description": "Text content of the feedback form"
            }
          },
          "required": [
            "name",
            "email",
            "text"
          ]
        },
        "UpdateStatusFormInput": {
          "type": "object",
          "properties": {
            "status": {
              "type": "boolean",
              "description": "Feedback form status"
            }
          },
          "required": [
            "status"
          ]
        },
        "Convocation": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "ID of the convocation"
            },
            "name": {
              "type": "string",
              "description": "Name of the convocation"
            },
            "parties": {
              "description": "Parties associated with the convocation",
              "type": "array",
              "items": {
                "type": "array"
              }
            },
            "deputies": {
              "description": "Deputies associated with the convocation",
              "type": "array",
              "items": {
                "type": "array"
              }
            }
          },
          "required": [
            "id",
            "name",
            "parties",
            "deputies"
          ]
        },
        "Party": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "ID of the party"
            },
            "logo": {
              "type": "string",
              "description": "Logo URL of the party"
            },
            "background": {
              "type": "string",
              "description": "Background image URL of the party"
            },
            "description": {
              "type": "string",
              "description": "Description of the party"
            },
            "convocations": {
              "description": "Convocations associated with the party",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Convocation"
              }
            },
            "deputies": {
              "description": "Deputies associated with the party",
              "type": "array",
              "items": {
                "type": "array"
              }
            }
          },
          "required": [
            "id",
            "logo",
            "background",
            "description",
            "convocations",
            "deputies"
          ]
        },
        "Deputy": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "ID of the deputy"
            },
            "name": {
              "type": "string",
              "description": "Name of the deputy"
            },
            "surname": {
              "type": "string",
              "description": "Surname of the deputy"
            },
            "photo": {
              "type": "string",
              "description": "Photo URL of the deputy"
            },
            "background": {
              "type": "string",
              "description": "Background image URL of the deputy"
            },
            "birthday": {
              "type": "string",
              "description": "Birthday of the deputy",
              "format": "date-time"
            },
            "description": {
              "type": "string",
              "description": "Description of the deputy"
            },
            "gender": {
              "type": "string",
              "description": "Gender of the deputy",
              "enum": [
                "male",
                "female"
              ]
            },
            "convocations": {
              "description": "Convocations associated with the deputy",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Convocation"
              }
            },
            "party": {
              "description": "Party associated with the deputy",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Party"
                }
              ]
            }
          },
          "required": [
            "id",
            "name",
            "surname",
            "photo",
            "background",
            "birthday",
            "description",
            "gender"
          ]
        },
        "CreateDeputyInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the deputy"
            },
            "surname": {
              "type": "string",
              "description": "Surname of the deputy"
            },
            "birthday": {
              "type": "string",
              "description": "Birthday of the deputy",
              "format": "date"
            },
            "description": {
              "type": "string",
              "description": "Description of the deputy"
            },
            "gender": {
              "type": "string",
              "description": "Gender of the deputy",
              "enum": [
                "male",
                "female"
              ]
            },
            "photo": {
              "type": "file",
              "description": "Photo of the deputy"
            },
            "background": {
              "type": "file",
              "description": "Background image of the deputy"
            },
            "partyId": {
              "type": "number",
              "description": "Party ID of the deputy"
            },
            "convocations": {
              "description": "Convocations of the deputy",
              "type": "array",
              "items": {
                "type": "number"
              }
            }
          },
          "required": [
            "name",
            "surname",
            "birthday",
            "description",
            "gender",
            "photo",
            "background"
          ]
        },
        "UpdateDeputyInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the deputy"
            },
            "surname": {
              "type": "string",
              "description": "Surname of the deputy"
            },
            "birthday": {
              "type": "string",
              "description": "Birthday of the deputy",
              "format": "date"
            },
            "description": {
              "type": "string",
              "description": "Description of the deputy"
            },
            "gender": {
              "type": "string",
              "description": "Gender of the deputy",
              "enum": [
                "male",
                "female"
              ]
            },
            "photo": {
              "type": "file",
              "description": "Photo of the deputy"
            },
            "background": {
              "type": "file",
              "description": "Background image of the deputy"
            },
            "partyId": {
              "type": "number",
              "description": "Party ID of the deputy"
            },
            "convocations": {
              "description": "Convocations of the deputy",
              "type": "array",
              "items": {
                "type": "number"
              }
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
