
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
            "Auth"
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
            "News"
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
            "News"
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
            "News"
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
            "News"
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
            "News"
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
            "News"
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
                      "$ref": "#/components/schemas/"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Tags"
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
            "Tags"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/tags/{id}": {
        "get": {
          "operationId": "TagController_getTagById",
          "summary": "Get tag by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
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
            "404": {
              "description": "Tag not Found"
            }
          },
          "tags": [
            "Tags"
          ]
        },
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
            "Tags"
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
            "Tags"
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
                      "$ref": "#/components/schemas/"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Category"
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
            "Category"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/categories/{id}": {
        "get": {
          "operationId": "CategoryController_getCategoryById",
          "summary": "Get category by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
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
            "404": {
              "description": "Category not found"
            }
          },
          "tags": [
            "Category"
          ]
        },
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
            "Category"
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
            "Category"
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
            "Feedback-form"
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
            "Feedback-form"
          ]
        }
      },
      "/feedback-form/{id}": {
        "get": {
          "operationId": "FormController_getFormById",
          "summary": "Return feedback form by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "feedback form by id",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Form"
                  }
                }
              }
            },
            "404": {
              "description": "Form not found"
            }
          },
          "tags": [
            "Feedback-form"
          ],
          "security": [
            {
              "bearer": []
            }
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
            "Feedback-form"
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
            "Deputy"
          ]
        },
        "post": {
          "operationId": "DeputyController_createDeputy",
          "summary": "Create deputy",
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
            "Deputy"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/deputy/{id}": {
        "get": {
          "operationId": "DeputyController_getDeputyById",
          "summary": "Get deputy by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return deputy by id",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Deputy"
                  }
                }
              }
            },
            "404": {
              "description": "Deputy not found"
            }
          },
          "tags": [
            "Deputy"
          ]
        },
        "put": {
          "operationId": "DeputyController_updateDeputy",
          "summary": "Update deputy by id",
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
            "Deputy"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "DeputyController_deleteDeputy",
          "summary": "Delete deputy by id",
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
            "Deputy"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/party": {
        "get": {
          "operationId": "PartyController_parties",
          "summary": "Get all parties",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of parties",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Party"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Party"
          ]
        },
        "post": {
          "operationId": "PartyController_createParty",
          "summary": "Create a new party",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "$ref": "#/components/schemas/PartyCreateInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Party created"
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Party"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/party/{id}": {
        "get": {
          "operationId": "PartyController_getPartyById",
          "summary": "Get party by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Party"
                  }
                }
              }
            },
            "404": {
              "description": "Party not found"
            }
          },
          "tags": [
            "Party"
          ]
        },
        "put": {
          "operationId": "PartyController_updateParty",
          "summary": "Update a party",
          "parameters": [
            {
              "name": "id",
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
              "multipart/form-data": {
                "schema": {
                  "$ref": "#/components/schemas/PartyUpdateInput"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "Party updated"
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "Party not found"
            }
          },
          "tags": [
            "Party"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "PartyController_deleteParty",
          "summary": "Delete a party",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Party deleted"
            },
            "404": {
              "description": "Party not found"
            }
          },
          "tags": [
            "Party"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/convocation": {
        "get": {
          "operationId": "ConvocationController_convocations",
          "summary": "Get all convocations",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of convocations",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Convocation"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Convocation"
          ]
        },
        "post": {
          "operationId": "ConvocationController_createConvocation",
          "summary": "Create a new convocation",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ConvocationCreateInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Convocation created"
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Convocation"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/convocation/{id}": {
        "get": {
          "operationId": "ConvocationController_getConvocationById",
          "summary": "Get convocation by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get convocation by id",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Convocation"
                  }
                }
              }
            },
            "404": {
              "description": "Convocation not found"
            }
          },
          "tags": [
            "Convocation"
          ]
        },
        "put": {
          "operationId": "ConvocationController_updateConvocation",
          "summary": "Update a convocation",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Convocation ID",
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
                  "$ref": "#/components/schemas/ConvocationUpdateInput"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Convocation updated"
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "Convocation not found"
            }
          },
          "tags": [
            "Convocation"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ConvocationController_deleteConvocation",
          "summary": "Delete a convocation",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Convocation ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Convocation deleted"
            },
            "404": {
              "description": "Convocation not found"
            }
          },
          "tags": [
            "Convocation"
          ],
          "security": [
            {
              "bearer": []
            }
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
            "createdAt": {
              "format": "date-time",
              "type": "string",
              "description": "Admin name will be created"
            },
            "accessible": {
              "type": "boolean",
              "description": "Display access by default true"
            },
            "createdBy": {
              "type": "string",
              "description": "Admin name will be created"
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
            "createdAt",
            "accessible",
            "createdBy",
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
              "type": "string",
              "description": "The sources of the news"
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
              "type": "string"
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
              "type": "string"
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
            "surname": {
              "type": "string",
              "description": "Surname of the person who submitted the form"
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
            "surname",
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
            "surname": {
              "type": "string",
              "description": "Surname of the person submitting the form"
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
            "surname",
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
            "name": {
              "type": "string",
              "description": "Name of the party"
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
            "name",
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
        },
        "PartyCreateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "convocationIds": {
              "type": "array",
              "items": {
                "type": "number"
              },
              "description": "Array of Convocation ids"
            },
            "logo": {
              "type": "file",
              "format": "binary",
              "description": "Image file"
            },
            "background": {
              "type": "file",
              "format": "binary",
              "description": "Image file"
            }
          },
          "required": [
            "name",
            "description",
            "convocationIds",
            "logo",
            "background"
          ]
        },
        "PartyUpdateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "convocationIds": {
              "type": "array",
              "items": {
                "type": "number"
              },
              "description": "Array of Convocation ids"
            },
            "logo": {
              "type": "file",
              "format": "binary",
              "description": "Image file"
            },
            "background": {
              "type": "file",
              "format": "binary",
              "description": "Image file"
            }
          },
          "required": [
            "name",
            "description",
            "convocationIds",
            "logo",
            "background"
          ]
        },
        "ConvocationCreateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Convocation name"
            }
          },
          "required": [
            "name"
          ]
        },
        "ConvocationUpdateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Convocation name"
            }
          },
          "required": [
            "name"
          ]
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
